export default function guid() {
        var buf = [],
            chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            charlen = chars.length,
            length = 32;

        for (var i = 0; i < length; i++) {
            buf[i] = chars.charAt(Math.floor(Math.random() * charlen));
        }

        return buf.join('');
    }
