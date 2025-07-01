const certificateModel = require('../Model/SaveCert');
const PDFSchemma = require('../Model/PDF');

module.exports = {
    fetchCertificate: async (id) => {
        try {
            const certificate = await certificateModel.findOne({ certificateNo: id });
            return { status: 1, data: certificate };
        } catch (error) {
            return { status: 0, message: error.message }
        }
    },
    saveCertificate: (data) => {
        try {
            const { name, description, issuedBy, certificationNo, dateOfIssue, validThrough } = data;
            const dataToSave = new certificateModel({
                name: name,
                certificateNo: certificationNo,
                dateOfIssue: dateOfIssue,
                validThrough: validThrough,
                description: description,
                issuedBy: issuedBy
            })

            const response = dataToSave.save();
            console.log("Response by saving", response);
            return 1;
        } catch (error) {
            console.log("Error in saving form", error.message);
            return 0;
        }
    },
    getAllCertificate: async () => {
        try {
            const allCertificate = await certificateModel.find();
            return allCertificate;
        } catch (error) {
            return 0;
        }
    },

    savePDF: async (req) => {
        // console.log("Ging to save")
        try {
            const newFile = new PDFSchemma({
                name: req.file.originalname,
                pdf: req.file.buffer,
                contentType: req.file.mimetype,
                userID: req.body.userID
            });

           const response= await newFile.save();
            console.log("File uploaded", response)
            return { success: true, data:response };
        } catch (error) {
            // console.log("Error in saving PDF", error.message);
            return { success: false, error: error.message };
        }
    },

    fetchPDF: async(id) =>{
        // console.log("Finding pdf", id)
        try {
            const response = await PDFSchemma.findOne({userID:id});
            // console.log("Response is ", response.pdf.buffer)
            return {status:true, data:response}
        } catch (error) {
            return {status:false, message:error.message}
        }
    },

    deletePDF : async(id) =>{
        try {
            const response = await PDFSchemma.deleteOne({userID: id});
            console.log("Delete response", response);
            return {status:true}; 
        } catch (error) {
            console.log("Error in deleting pdf", error.message);
            return {status:false, error:error.message};
        }
    }


}


