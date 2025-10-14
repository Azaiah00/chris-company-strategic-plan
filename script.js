// ============================================
// INTERACTIVE STRATEGIC BLUEPRINT SPA
// JavaScript Logic & Chart Initialization
// ============================================

// Wait for DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // 1. MOBILE MENU TOGGLE
    // ============================================
    
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Toggle mobile menu visibility on button click
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when a link is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
    
    
    // ============================================
    // 2. ANIMATED COUNTER FOR "HOURS SAVED"
    // ============================================
    
    const counterElement = document.getElementById('hours-saved');
    const targetNumber = 10; // The final number to count up to
    const duration = 2000; // Duration of animation in milliseconds
    const frameDuration = 1000 / 60; // 60 FPS
    const totalFrames = Math.round(duration / frameDuration);
    
    let frame = 0;
    
    // Counter animation function using easing
    function animateCounter() {
        frame++;
        const progress = frame / totalFrames;
        // Ease-out effect for smooth deceleration
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        const currentNumber = Math.round(easeOutProgress * targetNumber);
        
        counterElement.textContent = currentNumber;
        
        // Continue animation until we reach target
        if (frame < totalFrames) {
            requestAnimationFrame(animateCounter);
        } else {
            counterElement.textContent = targetNumber; // Ensure we end at exact target
        }
    }
    
    // Start counter animation on page load
    animateCounter();
    
    
    // ============================================
    // 3. SOLUTION TAB/TOGGLE FUNCTIONALITY
    // ============================================
    
    const tabContent = document.getElementById('tab-content');
    const tabHighlights = document.getElementById('tab-highlights');
    const workflowContent = document.getElementById('workflow-content');
    const workflowHighlights = document.getElementById('workflow-highlights');
    
    // Switch to Content Automation workflow
    if (tabContent) {
        tabContent.addEventListener('click', function() {
            // Update button states
            tabContent.classList.add('active');
            tabHighlights.classList.remove('active');
            
            // Update workflow visibility
            workflowContent.classList.add('active');
            workflowHighlights.classList.remove('active');
        });
    }
    
    // Switch to Highlights Generator workflow
    if (tabHighlights) {
        tabHighlights.addEventListener('click', function() {
            // Update button states
            tabHighlights.classList.add('active');
            tabContent.classList.remove('active');
            
            // Update workflow visibility
            workflowHighlights.classList.add('active');
            workflowContent.classList.remove('active');
        });
    }
    
    
    // ============================================
    // 4. EXPANSION CARDS (Future Section)
    // ============================================
    
    const expansionCards = document.querySelectorAll('.expansion-card');
    
    // Add click listeners to each expansion card
    expansionCards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle expanded state on the clicked card
            this.classList.toggle('expanded');
        });
    });
    
    
    // ============================================
    // 5. CHART.JS INITIALIZATION
    // ============================================
    
    // Define consistent color scheme for all charts - Focus Sports VA Brand
    const chartColors = {
        primary: '#00274D',
        secondary: '#0077CC',
        accent: '#0077CC',
        orange: '#FFA500',
        danger: '#EF4444',
        success: '#10B981',
        gray: '#6B7280'
    };
    
    // Create gradient for line chart with orange accent
    function createGradient(ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 250);
        gradient.addColorStop(0, 'rgba(255, 165, 0, 0.4)');
        gradient.addColorStop(0.5, 'rgba(0, 119, 204, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 119, 204, 0.05)');
        return gradient;
    }
    
    // ----------------------------------------
    // CHART A: Time Reclaimed (Bar Chart)
    // ----------------------------------------
    
    const ctxTime = document.getElementById('chart-time');
    if (ctxTime) {
        new Chart(ctxTime, {
            type: 'bar',
            data: {
                labels: ['Manual', 'AI-Powered'],
                datasets: [{
                    label: 'Hours per Week',
                    data: [10, 1], // 10 hours manual vs 1 hour automated
                    backgroundColor: [
                        chartColors.danger,
                        chartColors.success
                    ],
                    borderColor: [
                        chartColors.danger,
                        chartColors.success
                    ],
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 13
                        },
                        cornerRadius: 8
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 12,
                        ticks: {
                            callback: function(value) {
                                return value + 'h';
                            },
                            font: {
                                size: 11
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 11,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    
    // ----------------------------------------
    // CHART B: Cost Efficiency (Donut Chart)
    // ----------------------------------------
    
    const ctxCost = document.getElementById('chart-cost');
    if (ctxCost) {
        new Chart(ctxCost, {
            type: 'doughnut',
            data: {
                labels: ['Social Media Manager', 'AI Automation Service'],
                datasets: [{
                    label: 'Monthly Cost',
                    data: [3500, 899], // Social media manager vs automation service cost
                    backgroundColor: [
                        chartColors.danger,
                        chartColors.accent
                    ],
                    borderColor: '#FFFFFF',
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: {
                                size: 11
                            },
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 13
                        },
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return context.label + ': $' + context.parsed.toLocaleString();
                            }
                        }
                    }
                },
                cutout: '65%'
            }
        });
    }
    
    
    // ----------------------------------------
    // CHART C: Projected Lead Growth (Line Chart)
    // ----------------------------------------
    
    const ctxLeads = document.getElementById('chart-leads');
    if (ctxLeads) {
        const gradient = createGradient(ctxLeads.getContext('2d'));
        
        new Chart(ctxLeads, {
            type: 'line',
            data: {
                labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
                datasets: [{
                    label: 'Leads Generated',
                    data: [50, 75, 110, 165, 245, 360], // Exponential growth trajectory
                    borderColor: chartColors.orange,
                    backgroundColor: gradient,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4, // Smooth curve
                    pointBackgroundColor: chartColors.orange,
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 13
                        },
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return 'Leads: ' + context.parsed.y;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            font: {
                                size: 11
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 10
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    
    // ============================================
    // 6. SMOOTH SCROLL WITH OFFSET FOR STICKY NAV
    // ============================================
    
    // Add smooth scrolling with offset for sticky navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    // ============================================
    // 7. SCROLL-TRIGGERED ANIMATIONS
    // ============================================
    
    // Intersection Observer for fade-in animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all elements with fade-in classes
    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
        fadeObserver.observe(el);
    });
    
    
    // ============================================
    // 8. NAVBAR SCROLL EFFECT
    // ============================================
    
    // Add shadow to navbar on scroll
    let lastScroll = 0;
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
        }
        
        lastScroll = currentScroll;
    });
    
    
    // ============================================
    // INITIALIZATION COMPLETE
    // ============================================
    
    console.log('Strategic Blueprint SPA initialized successfully!');
    
});

