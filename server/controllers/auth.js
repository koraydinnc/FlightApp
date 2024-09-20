const AuthSchema = require('../models/auth.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Doğru e-posta doğrulama pattern'i
const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

function isEmailAddress(str) {
    return pattern.test(str);  
}

const register = async(req, res) => {
    try {
        const { email, password } = req.body;
        
        // E-posta doğrulama
        if (!isEmailAddress(email)) {
            return res.status(400).json({ msg: 'Geçersiz E-posta Adresi' });
        }

        // Kullanıcı var mı kontrolü
        const user = await AuthSchema.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'Böyle Bir Kullanıcı Zaten Var' });
        }

        // Şifre uzunluğu kontrolü
        if (password.length < 6) {
            return res.status(400).json({ msg: 'Şifreniz 6 Karakterden Küçük Olmamalı' });
        }

        // Şifreyi hash'leme
        const passwordHash = await bcrypt.hash(password, 12);

        // Yeni kullanıcı kaydetme
        const newUser = new AuthSchema({
            email,
            password: passwordHash
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ msg: 'Kayıt Başarılı', status: "OK", token, newUser });

    } catch (error) {
        res.status(500).json({ msg: 'Sunucu Hatası', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kullanıcıyı bulma
        const user = await AuthSchema.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Kullanıcı Bulunamadı' });
        }

        // Şifreyi karşılaştırma
        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            return res.status(400).json({ msg: 'Yanlış Şifre' });
        }

        // Token oluşturma
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ msg: 'Giriş Başarılı', token, user, status: 'OK' });

    } catch (error) {
        res.status(500).json({ msg: 'Sunucu Hatası', error: error.message });
    }
};

module.exports = { register, login };
