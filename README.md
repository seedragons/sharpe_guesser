# Sharpe Ratio Guesser

A simple web-based game where players try to guess the Sharpe ratio of a displayed return series. The game helps develop intuition for identifying risk-adjusted returns by visual inspection.

## How to Play

1. Open `index.html` in your web browser
2. You'll see a chart showing 2 years of daily returns
3. Use the slider to guess the Sharpe ratio (between -3 and 3)
4. Click "SUBMIT GUESS" to see how close you were
5. Click "NEXT ROUND" when you're ready for a new series

## Technical Details

- Pure HTML/CSS/JavaScript implementation
- Uses Chart.js for data visualization
- No server required - runs entirely in the browser
- Generates random return series with varying Sharpe ratios

## Files

- `index.html` - Main game interface
- `styles.css` - Game styling and layout
- `game.js` - Game logic and chart generation
- `README.md` - This documentation file 