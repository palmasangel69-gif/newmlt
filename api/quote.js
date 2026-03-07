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

    console.log('New MLT quote request:', {
      name,
      phone,
      email,
      eventType,
      date,
      hours,
      pickup,
      dropoff,
      passengers,
      notes,
      submittedAt: new Date().toISOString()
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
