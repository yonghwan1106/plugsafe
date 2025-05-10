// PLUG-SAFE+ Website Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS Animations
    AOS.init({
        once: true,
        duration: 800,
        easing: 'ease-out',
        delay: 100
    });

    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        });
    });

    // Animated counters
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const animateCounters = () => {
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const count = parseInt(counter.innerText);
                const increment = target / 100;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(animateCounters, 50);
                } else {
                    counter.innerText = target;
                }
            });
        };
        
        // Initialize counters
        counters.forEach(counter => {
            counter.innerText = '0';
        });
        
        // Animate when elements are in viewport
        const counterSection = document.querySelector('.counter-section');
        if (counterSection) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    animateCounters();
                    observer.unobserve(counterSection);
                }
            }, { threshold: 0.5 });
            
            observer.observe(counterSection);
        }
    }

    // Implementation of tab functionality for detail pages
    const tabs = document.querySelectorAll('[data-tab-target]');
    const tabContents = document.querySelectorAll('[data-tab-content]');
    
    if (tabs.length > 0 && tabContents.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = document.querySelector(tab.dataset.tabTarget);
                
                tabContents.forEach(content => {
                    content.classList.remove('block');
                    content.classList.add('hidden');
                });
                
                tabs.forEach(t => {
                    t.classList.remove('border-primary', 'text-primary');
                    t.classList.add('border-transparent', 'text-gray-500');
                });
                
                tab.classList.remove('border-transparent', 'text-gray-500');
                tab.classList.add('border-primary', 'text-primary');
                
                if (target) {
                    target.classList.remove('hidden');
                    target.classList.add('block');
                }
            });
        });
    }

    // Initialize any Charts.js charts if they exist
    initializeCharts();
});

// Initialize Chart.js visualizations
function initializeCharts() {
    // Fire Safety Statistics Chart
    const fireSafetyChartEl = document.getElementById('fire-safety-chart');
    if (fireSafetyChartEl) {
        const fireSafetyChart = new Chart(fireSafetyChartEl, {
            type: 'pie',
            data: {
                labels: ['전기화재', '가스화재', '기타화재'],
                datasets: [{
                    data: [24.3, 12.5, 63.2],
                    backgroundColor: [
                        '#1e40af',
                        '#fbbf24',
                        '#94a3b8'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: '2024년 화재 원인 분포',
                        font: {
                            size: 16
                        }
                    }
                }
            }
        });
    }
    
    // Electricity Usage Time Series Chart
    const electricityChartEl = document.getElementById('electricity-usage-chart');
    if (electricityChartEl) {
        const electricityChart = new Chart(electricityChartEl, {
            type: 'line',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024'],
                datasets: [
                    {
                        label: '전기화재 비율 (%)',
                        data: [19.2, 20.5, 21.7, 22.8, 24.3],
                        borderColor: '#1e40af',
                        backgroundColor: 'rgba(30, 64, 175, 0.2)',
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: '피해액 (억원)',
                        data: [3500, 4200, 4800, 5000, 6200],
                        borderColor: '#dc2626',
                        backgroundColor: 'rgba(220, 38, 38, 0.1)',
                        tension: 0.3,
                        fill: true,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: '전기화재 비율 (%)'
                        }
                    },
                    y1: {
                        position: 'right',
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: '피해액 (억원)'
                        },
                        grid: {
                            drawOnChartArea: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: '연도별 전기화재 추이',
                        font: {
                            size: 16
                        }
                    }
                }
            }
        });
    }
    
    // Cost-Benefit Analysis Chart
    const costBenefitChartEl = document.getElementById('cost-benefit-chart');
    if (costBenefitChartEl) {
        const costBenefitChart = new Chart(costBenefitChartEl, {
            type: 'bar',
            data: {
                labels: ['초기 투자비용', '전기요금 절감', '보험료 할인', '가전수명 연장', '총 경제적 효과'],
                datasets: [{
                    label: '연간 금액 (원)',
                    data: [-49900, 51600, 28000, 35000, 114600],
                    backgroundColor: [
                        'rgba(220, 38, 38, 0.6)',
                        'rgba(30, 64, 175, 0.6)',
                        'rgba(30, 64, 175, 0.6)',
                        'rgba(30, 64, 175, 0.6)',
                        'rgba(251, 191, 36, 0.6)'
                    ],
                    borderColor: [
                        'rgb(220, 38, 38)',
                        'rgb(30, 64, 175)',
                        'rgb(30, 64, 175)',
                        'rgb(30, 64, 175)',
                        'rgb(251, 191, 36)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: '금액 (원)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: '가구당 경제적 효과 분석',
                        font: {
                            size: 16
                        }
                    }
                }
            }
        });
    }
    
    // Timeline Chart for Development Roadmap
    const roadmapChartEl = document.getElementById('roadmap-chart');
    if (roadmapChartEl) {
        const roadmapLabels = ['2025', '2026', '2027', '2028', '2029', '2030'];
        const roadmapChart = new Chart(roadmapChartEl, {
            type: 'line',
            data: {
                labels: roadmapLabels,
                datasets: [
                    {
                        label: '예상 보급률 (%)',
                        data: [2, 10, 25, 45, 65, 80],
                        borderColor: '#1e40af',
                        backgroundColor: 'rgba(30, 64, 175, 0.2)',
                        tension: 0.3,
                        fill: true,
                        pointRadius: 6,
                        pointHoverRadius: 8
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: '보급률 (%)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    tooltip: {
                        callbacks: {
                            afterLabel: function(context) {
                                const milestones = [
                                    '시스템 출시',
                                    '다가구 주택 통합 관리 시스템 출시',
                                    '인공지능 자율 대응 기능 추가',
                                    '스마트그리드 연동 플랫폼화',
                                    '해외 시장 진출 본격화',
                                    '글로벌 전기안전 표준 플랫폼 확립'
                                ];
                                return '주요 이정표: ' + milestones[context.dataIndex];
                            }
                        }
                    }
                }
            }
        });
    }
}
