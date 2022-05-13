module.exports = {
    ApiResponse: (data,message="Success",status=true) => {
        return {
            data:data,
            message,
            status
        }
    }
}