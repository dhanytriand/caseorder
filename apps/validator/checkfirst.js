'use stricts'
module.exports = (name, value, param, param2) => {
    if(value[0] != param)
    {
        return "Field " + name + " should start with " + param + " " + param2;
    }
    return "";
}