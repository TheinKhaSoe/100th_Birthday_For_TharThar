
module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed.' });
    }

    const { author, text } = req.body || {};

    if (
        typeof author !== 'string' ||
        typeof text !== 'string' ||
        !author.trim() ||
        !text.trim()
    ) {
        return res.status(400).json({
            error: 'Author and text are required.'
        });
    }

    if (author.length > 100 || text.length > 1000) {
        return res.status(400).json({ error: 'Input too long.' });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
        return res.status(500).json({
            error: 'Telegram configuration is missing.'
        });
    }

    const message =
        `💌 New Wish for Baby's 100th Day!\n\n` +
        `From: ${author}\nMessage: ${text}`;

    try {
        const response = await fetch(
            `https://api.telegram.org/bot${botToken}/sendMessage`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message
                }),
                signal: AbortSignal.timeout(8000)
            }
        );

        const data = await response.json();

        if (data.ok) {
            return res.status(200).json({
                success: true,
                message: 'Wish sent successfully!'
            });
        }

        return res.status(502).json({
            error: 'Telegram delivery failed.'
        });

    } catch (error) {
        console.error('Telegram error:', error);

        return res.status(502).json({
            error: 'Failed to deliver wish.'
        });
    }
};
