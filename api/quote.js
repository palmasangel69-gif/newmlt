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

    const subject = "New Quote Request - MLT Transportation";

    const body =
`New Quote Request

Name: ${name}
Phone: ${phone}
Email: ${email}
Event Type: ${eventType}
Event Date: ${date}
Hours Needed: ${hours}
Pickup City: ${pickup}
Drop-off City: ${dropoff}
Passengers: ${passengers}

Notes:
${notes}
`;

    const mailtoLink =
`mailto:mlttransportations@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    return res.status(200).json({
      success: true,
      redirect: mailtoLink
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}
