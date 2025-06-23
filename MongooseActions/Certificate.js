const certificateModel = require('../Model/SaveCert');
module.exports= {
    fetchCertificate  :async(id) =>{
                try {
                    const certificate = await certificateModel.findOne({certificateNo:id});
                    return {status:1, data:certificate};
                } catch (error) {
                    return {status:0, message:error.message}
                }
    },
    saveCertificate :(data) =>{
        try {
            const {name, description, issuedBy, certificationNo, dateOfIssue, validThrough} = data;
            const dataToSave = new certificateModel({
                name:name,
                certificateNo:certificationNo,
                dateOfIssue : dateOfIssue, 
                validThrough : validThrough,
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
    getAllCertificate :async()=>{
        try {
            const allCertificate = await certificateModel.find();
            return allCertificate;
        } catch (error) {
            return 0;
        }
    }
}