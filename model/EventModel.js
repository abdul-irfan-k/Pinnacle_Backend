import mongoose from 'mongoose'
const Schema = mongoose.Schema

const EventSchema = new Schema({
    Email: { type: String },
    CollegeName: { type: String },
    ITManagerName: { type: String },
    WebDesign: {
        Phone: { type: String },
        Name: { type: String },
    },
    ITQuiz: {
        Phone: { type: String },
        Name: { type: String },
    },
    ITQuiz1: {
        Phone: { type: String },
        Name: { type: String },
    },
    Coding: {
        Phone: { type: String },
        Name: { type: String },
    },
    Gaming: {
        Phone: { type: String },
        Name: { type: String },
    },
    Gaming1: {
        Phone: { type: String },
        Name: { type: String },
    },
    ThemaDance: {
        Phone: { type: String },
        Name: { type: String },
    },
    ThemaDance1: {
        Phone: { type: String },
        Name: { type: String },
    },
    ThemaDance2: {
        Phone: { type: String },
        Name: { type: String },
    },
    ThemaDance3: {
        Phone: { type: String },
        Name: { type: String },
    },
    ThemaDance4: {
        Phone: { type: String },
        Name: { type: String },
    },
    ThemaDance5: {
        Phone: { type: String },
        Name: { type: String },
    },
    PaperPresentation: {
        Phone: { type: String },
        Name: { type: String },
    },
    ProductLaunch: {
        Phone: { type: String },
        Name: { type: String },
    },
    ProductLaunch1: {
        Phone: { type: String },
        Name: { type: String },
    },
    SurpriseEvent: {
        Phone: { type: String },
        Name: { type: String },
    },
    PhotoGraphyAndVideoGraphy: {
        Phone: { type: String },
        Name: { type: String },
    },
    ITManager: {
        Phone: { type: String },
        Name: { type: String },
    },
    PdfUrl: {
        type: String
    }
})

const EventModel = mongoose.model('EventSchema', EventSchema)
export default EventModel