require('dotenv').config();
const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname)));

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 30,
    message: { error: 'Too many wishes! Please try again later.' }
});
app.use('/api/wishes', limiter);

app.post('/api/wishes', async (req, res) => {
    const { author, text } = req.body;

    if (!author || !text) {
        return res.status(400).json({ error: 'Author and text are required.' });
    }

    if (author.length > 100 || text.length > 1000) {
        return res.status(400).json({ error: 'Input too long.' });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
        return res.status(500).json({ error: 'Telegram configuration is missing on the server.' });
    }

    const message = `💌 New Wish for Baby's 100th Day!\n\n*From:* ${author}\n*Message:* ${text}`;

    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' }),
            signal: AbortSignal.timeout(10000)
        });

        const data = await response.json();

        if (data.ok) {
            res.json({ success: true, message: 'Wish sent to Telegram successfully!' });
        } else {
            console.error('Telegram API error:', data.description);
            res.status(502).json({ error: data.description || 'Telegram API returned an error.' });
        }
    } catch (err) {
        console.error('Telegram send error:', err.message);
        res.status(502).json({ error: 'Failed to deliver wish to Telegram.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
