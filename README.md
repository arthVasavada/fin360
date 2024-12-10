
# Fin360 - Stock Analytics Dashboard

**Fin360** is a modern stock analytics application that provides real-time and historical stock data. Designed for investors, it offers interactive visualizations, a customizable dashboard, and dark mode support.

---

## Features

- **Real-Time Stock Data**: View up-to-date stock prices, daily changes, and market trends via the Alpha Vantage API.
- **Historical Data Visualization**: Analyze trends with interactive charts for various timeframes.
- **Multi-Stock Comparison**: Compare multiple stocks with detailed visualizations.
- **Customizable Dashboard**: Set default stocks and preferences for a personalized experience.
- **Dark Mode Support**: Switch between light and dark themes for better accessibility.
- **Caching Mechanism**: Save and reuse data locally to optimize API usage and performance.

---

## Tech Stack

### Frontend
- **React**: Component-based UI framework.
- **TypeScript**: Ensures type safety and robust development.
- **Vite**: Fast and modern build tool for React.
- **Tailwind CSS**: Utility-first CSS framework for responsive and clean design.

### APIs
- **Alpha Vantage API**: Provides stock market data for real-time and historical trends.

### Deployment
- **Firebase Hosting**: Secure and scalable hosting platform for web apps.

---

## Getting Started

Follow these steps to run Fin360 locally.

### Prerequisites

- **Node.js** (v16+ recommended)
- **NPM** (comes with Node.js)
- **Alpha Vantage API Key** ([Get it here](https://www.alphavantage.co/support/#api-key))

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/<your-username>/fin360.git
   cd fin360
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Add API Key**
   Create a `.env` file in the root directory and add your Alpha Vantage API key:
   ```
   VITE_API_KEY=your_api_key_here
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

6. **Serve Locally**
   ```bash
   npx serve dist
   ```

---

## Live Demo

Visit the live version of the app: [Fin360 Live Demo](https://your-app-name.web.app)

---

## Usage

### Dashboard
- View real-time stock prices, daily changes, and other key metrics.
- Add and customize default stocks for quick access.

### Analytics
- Compare multiple stocks with interactive historical charts.
- Customize timeframes (1 month, 3 months, 6 months, etc.).

### Settings
- Toggle dark mode.
- Set default stocks and time ranges.
- Enable or disable notifications.

---

## Contributing

We welcome contributions to improve Fin360! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your commit message here"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request on GitHub.

---

## Roadmap

- [ ] Add support for additional APIs (e.g., Yahoo Finance, NSE India).
- [ ] Integrate email notifications for stock price alerts.
- [ ] Enhance caching mechanism with IndexedDB.
- [ ] Mobile-responsive layout improvements.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## Acknowledgments

- [Alpha Vantage API](https://www.alphavantage.co/) for real-time and historical stock data.
- [Tailwind CSS](https://tailwindcss.com/) for sleek and responsive design.
- [Firebase](https://firebase.google.com/) for seamless deployment and hosting.

---
