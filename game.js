class SharpeGame {
    constructor() {
        this.chart = null;
        this.returns = [];
        this.cumulativeReturns = [];
        this.currentSharpe = 0;
        
        this.setupEventListeners();
        this.initializeChart();
        this.generateNewReturns();
    }

    setupEventListeners() {
        document.getElementById('sharpeGuess').addEventListener('input', (e) => {
            document.getElementById('guessDisplay').textContent = (+e.target.value).toFixed(2);
        });

        document.getElementById('submitGuess').addEventListener('click', () => this.checkGuess());
        document.getElementById('nextRound').addEventListener('click', () => this.startNewRound());
    }

    initializeChart() {
        const ctx = document.getElementById('returnsChart').getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    data: [],
                    borderColor: 'rgba(0, 0, 0, 0.5)',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    borderWidth: 1,
                    pointRadius: 0,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        min: 0,
                        max: 1,
                        grid: {
                            display: true
                        },
                        ticks: {
                            maxTicksLimit: 10
                        }
                    },
                    y: {
                        grid: {
                            display: true
                        },
                        ticks: {
                            maxTicksLimit: 8,
                            callback: function(value) {
                                return (value * 100).toFixed(0) + '%';
                            }
                        }
                    }
                },
                animation: {
                    duration: 0
                }
            }
        });
    }

    generateNewReturns() {
        const n = 504;
        this.returns = [];
        this.cumulativeReturns = [];
        
        const targetSharpe = (Math.random() * 6) - 3;
        const annualizedVolatility = 0.15;
        const dailyVolatility = annualizedVolatility / Math.sqrt(252);
        const dailyReturn = (targetSharpe * annualizedVolatility) / 252;

        let cumReturn = 1;
        this.cumulativeReturns.push(cumReturn);

        for (let i = 0; i < n; i++) {
            const randomReturn = jStat.normal.sample(dailyReturn, dailyVolatility);
            this.returns.push(randomReturn);
            
            cumReturn += randomReturn;
            this.cumulativeReturns.push(cumReturn);
        }

        this.currentSharpe = this.calculateSharpe(this.returns);
        this.updateChart();
    }

    calculateSharpe(returns) {
        const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
        const variance = returns.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / returns.length;
        const stdDev = Math.sqrt(variance);
        return (mean / stdDev) * Math.sqrt(252);
    }

    updateChart() {
        const points = this.cumulativeReturns.map((r, i) => ({
            x: i / this.returns.length,
            y: r - 1
        }));

        this.chart.data.datasets[0].data = points;
        this.chart.update('none');
    }

    checkGuess() {
        const guessedValue = +document.getElementById('sharpeGuess').value;
        const difference = Math.abs(this.currentSharpe - guessedValue);
        
        document.getElementById('trueSharpe').textContent = this.currentSharpe.toFixed(2);
        document.getElementById('guessedSharpe').textContent = guessedValue.toFixed(2);
        document.getElementById('difference').textContent = difference.toFixed(2);
        
        document.querySelector('.results').style.display = 'flex';
        document.getElementById('submitGuess').style.display = 'none';
    }

    startNewRound() {
        document.querySelector('.results').style.display = 'none';
        document.getElementById('submitGuess').style.display = 'block';
        document.getElementById('sharpeGuess').value = 0;
        document.getElementById('guessDisplay').textContent = '0.00';
        this.generateNewReturns();
    }
}

window.addEventListener('load', () => {
    new SharpeGame();
}); 