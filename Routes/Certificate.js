const route = require('express').Router();
const certificate = require('../MongooseActions/Certificate');
const upload = require('../Middlewares/Multer');
const { rawListeners } = require('../Model/SaveCert');
route.post('/getCertificate', async (req, res) => {
    const certifiCateId = req.body.id;
    console.log("Certificate no", certifiCateId)
    // res.json({
    //         name: 'HIRAN HUSSAIN',
    //         description: 'OSHA GENERAL INDUSTRY - 30Hrs',
    //         issuedBy: 'IQ-OHS',
    //         certificationNo: 'IQ-263438',
    //         dateOfIssue: '29/Mar/2024',
    //         validThrough: 'Life Time',
    //       })
    // console.log("Certificate id is", id)
    try {
        const response = await certificate.fetchCertificate(certifiCateId);
        console.log("Response is", response.data);
        if (response.status == 1) {
            res.status(200).json(response.data)
        } else {
            res.status(500).json(response.message)
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
})

route.post('/saveCertificate', async (req, res) => {
    const formData = req.body;
    // console.log("Data to save", formData)
    // res.send("Success")
    try {
        const response = await certificate.saveCertificate(formData);
        if (response == 1) {
            res.status(200).json({ status: 1, message: "Success" })
        } else {
            res.status(500).json({ status: 0, message: "Internal server error" })
        }
    } catch (error) {
        res.status(500).json({ status: 0, message: error.message })
    }
})

route.get('/getAllCertificate', async (req, res) => {
    // console.log("Searching")
    try {
        const allCert = await certificate.getAllCertificate();
        res.status(200).json(allCert)
    } catch (error) {
        console.log("Fail to fetch all certificatte", error.message)
        res.status(500).send(error.message)
    }
})

// Route to upload PDF
route.post("/uploadPDF", upload.single("pdfFile"), async (req, res) => {
    // console.log("Saving file", req.file);
    console.log("BOdy is ", req.body);

    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded.");
        }



        const result = await certificate.savePDF(req);
        if (result.success) {
            res.contentType('application/pdf');
            res.status(201).json({status:true})
        } else {
            res.status(500).send("Failed to upload PDF: " + result.error);
        }

    } catch (err) {
        res.status(500).send("Error saving file.");
    }
});


// route.get('/getPDF', async(req,res)=>{
//     console.log("Getting PDF", req.body)
//     try {
//         const response = await certificate.fetchPDF(req.body.id);
//         // console.log("Res", response.data)
//         if(response.status){
//             console.log("sending pdf")
//             res.contentType('application/pdf');
//             // console.log("Buffer length", response.data.length);
//             res.status(200).send(Buffer.from(response.data.pdf.buffer)); 
//         }else{
//             res.status(200).json({status:true, data:null})
//         }
//     } catch (error) {
//         console.log("Failed to send PDF",error.message)
//         res.status(500).json({status:"Failed", message:error.message})
//     }
// })

route.get('/getPDF/:id', async (req, res) => {
    const id = req.params.id
    console.log("Getting PDF", id)
    try {
        const response = await certificate.fetchPDF(id);
        if (!response) {
            throw new Error("PDF not found")
        }
        res.contentType('application/pdf');
        res.send(Buffer.from(response.pdf.buffer));

    } catch (error) {
        res.status(500).json({ status: false, message: error.message })
    }
})

route.post('/deletePDF', async (req, res) => {
    console.log("To delete pdf", req.body)
    try {
        const response = await certificate.deletePDF(req.body.userID);
        if (response) {
            res.status(200).json({ status: true });
        } else {
            res.status(500).json({ status: false, error: response.error })
        }
    } catch (error) {
        console.log("Error in deleting", error.message)
        res.status(500).json({ status: false, error: error.message })
    }
})



module.exports = route