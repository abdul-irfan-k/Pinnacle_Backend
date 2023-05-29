import EventModel from "../model/EventModel.js"
import puppeteer from 'puppeteer'
import nodemailer from 'nodemailer'
import path from 'path'
import ejs from 'ejs'
import { error } from "console"
const __dirname = path.resolve()


export const registerToEvent = async (req, res) => {
    try {
        console.log(req.url)
        console.log(req.body)
        const { Email, CollegeName, ITManagerName, WebDesign, ITQuiz, ITQuiz1, Coding, Gaming, Gaming1, ThemaDance1, ThemaDance2, ThemaDance3, ThemaDance4, ThemaDance5, ThemaDance, PaperPresentation, ProductLaunch, ProductLaunch1, SurpriseEvent, PhotoGraphyAndVideoGraphy, ITManager } = req.body

        if (!Email) return res.status(400).json({ isValid: false, errorType: 'EMAILNOTFOUND', errorMessage: 'Please enter the Email' })
        const oldRegisteredDate = await EventModel.findOne({ Email })
        if (oldRegisteredDate) return res.status(400).json({ isValid: false, errorType: 'ALREADYLOGEDINSAMEEMAIL', errorMessage: 'Already one user registered using this Email' })
        const randomString = (Math.random() + 1).toString(36).substring(7);
        const pdfUrl = `${Date.now()}${randomString}.pdf`

        const newRegister = new EventModel({
            Email, CollegeName, ITManagerName, WebDesign, ITQuiz, ITQuiz1,
            Coding, Gaming, Gaming1, ThemaDance1, ThemaDance2, ThemaDance3, ThemaDance4,
            ThemaDance5, ThemaDance, PaperPresentation, ProductLaunch, ProductLaunch1,
            SurpriseEvent, PhotoGraphyAndVideoGraphy, ITManager, PdfUrl: pdfUrl
        })
        const data = await newRegister.save()

        downloadPdf(data, pdfUrl).then(({ err, isValid, pdfUrl }) => {
            if (err || isValid == false) return console.log('downlaod pdf is not valid')

            const { subject, htmlStructure } = getEmailStructure(data.ITManagerName, pdfUrl)
            console.log(data.Email)
            sendMail(data.Email, subject, '', htmlStructure).then((data) => {
                console.log('finished ')
                return res.status(200).json({ isValid: true, pdfUrl })
            }).catch((err) => console.log('email error ', error))

        }).catch((err) => console.log('err', err))
    } catch (error) {
        console.log("mongoose e", error)
    }
}


export const sendMail = (email, subject, text, html) => {
    return new Promise(async (resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAIL_EMAIL,
                pass: process.env.NODEMAIL_SECRET
            }
        })
        const mailContainer = {
            from: process.env.NODEMAIL_EMAIL,
            to: email, subject, text, html
        }

        transporter.sendMail(mailContainer, async (err, info) => {
            console.log(err)
            if (err) return reject(err)
            resolve(null, true)
        })
    })

}


export const downloadPdf = (data, pdfUrl) => {

    return new Promise((resolve, reject) => {
        ejs.renderFile(path.join(__dirname, './', 'public', 'file.ejs'), { data }, async (err, data) => {
            if (err) return reject({ err })
            const browser = await puppeteer.launch({ headless: 'new' })
            const page = await browser.newPage()
            await page.setContent(data, {
                waitUntil: 'domcontentloaded'
            })
            await page.setViewport({ width: 1680, height: 1050 });

            await page.pdf({
                path: path.join(__dirname, './', 'public', 'EventPdf', pdfUrl),
                format: "A4"
            })
            await browser.close()
            resolve({ err, isValid: true, pdfUrl })
        })
    })
}


const getEmailStructure = (managerName, fileUrl) => {
    const subject = 'PINNACLE 2023 REGISTRATION'

    const htmlStructure = `<!DOCTYPE html>
<html lang="en">
<head>
<style>
    body {
        text-align: center;
    }

    img {
        width: 100%;
        height: 100%;
    }

    h1 {
        margin:auto;
        font-size: 55px;
    }

    p {
        margin:auto;
        font-size: 25px;
    }


    span {
        margin:auto;
        font-size: 22px;
        font-weight: 600;
        margin:30px 0;
    }

    .button {
        width:5rem;
        background-color: rgb(49, 70, 188);
        padding: 15px 30px;
        border-radius: 10px;
        margin: 10px auto;
        display:flex;
        align-item:center;
        justify-content:center;
    }

    .button a {
        width: 100%;
        height: 100%;
        text-decoration: none;
        color: #fff;
        display:flex;
        align-item:center;
        justify-content:center;
    }
</style>
</head>
<body>
    <h1>St Philomena College Pinnacle 2023</h1>
    <p>Dear ${managerName} your registration in pinncle is succussfull </p>

    <span class="span">You can download your applicants detais pdf here </span>
    <div class="button"><a href="http://localhost:8000/EventPdf/${fileUrl}">Download</a></div>
</body>

</html>`

    return { subject, htmlStructure }
}