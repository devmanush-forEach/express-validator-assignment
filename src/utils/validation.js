module.exports = (errors) => {

    return errors.map((err)=> {

        return {
            field : err.param,
            message : err.msg
        };

    });
}