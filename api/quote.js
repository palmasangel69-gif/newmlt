import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      name,
      phone,
      email,
      eventType,
      date,
      hours,
      pickup,
      dropoff,
      passengers,
      notes
    } = req.body;

    if (!name || !phone || !eventType) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    await resend.emails.send({
      from: 'MLT Transportation <onboarding@resend.dev>',
      to: ['mlttransportations@gmail.com'],
      subject: `New Quote Request - ${eventType}`,
      reply_to: email || undefined,
      text: `
New MLT Quote Request

Name: ${name}
Phone: ${phone}
Email: ${email}
Event Type: ${eventType}
Event Date: ${date}
Hours Needed: ${hours}
Pickup City: ${pickup}
Drop-off City: ${dropoff}
Passengers: ${passengers}

Notes / Itinerary:
${notes}
      `
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Quote request error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
