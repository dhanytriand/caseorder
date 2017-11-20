'use stricts'
module.exports = (name, value) => {
    if (value.search(/[!"#$%&'()*+.,\/:;<=>?@\[\\\]^_`{}~-]/) != -1) {
        return name + " can contain alphabet, space & |"
    }
    return ""
}