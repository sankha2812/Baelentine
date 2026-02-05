// Interactive elements
const mainHeart = document.getElementById('mainHeart');
const messagesSection = document.getElementById('messagesSection');
const questionSection = document.getElementById('questionSection');
const finalSection = document.getElementById('finalSection');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const floatingHeartsContainer = document.getElementById('floatingHearts');

let heartClicked = false;
let noBtnClickCount = 0;

// Main heart click event
mainHeart.addEventListener('click', () => {
    if (!heartClicked) {
        heartClicked = true;
        
        // Create explosion of hearts
        createHeartExplosion(mainHeart);
        
        // Show messages section after a short delay
        setTimeout(() => {
            messagesSection.style.display = 'block';
            mainHeart.style.animation = 'none';
            
            // Scroll to messages section with proper spacing from top (slower scroll)
            setTimeout(() => {
                const messagesSectionTop = messagesSection.getBoundingClientRect().top + window.pageYOffset;
                const offset = 80; // Gap from top
                const targetPosition = messagesSectionTop - offset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1200; // Slower scroll duration in milliseconds
                let start = null;
                
                function smoothScroll(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const percentage = Math.min(progress / duration, 1);
                    // Easing function for smooth deceleration
                    const easing = percentage < 0.5 
                        ? 2 * percentage * percentage 
                        : -1 + (4 - 2 * percentage) * percentage;
                    
                    window.scrollTo(0, startPosition + distance * easing);
                    
                    if (progress < duration) {
                        requestAnimationFrame(smoothScroll);
                    }
                }
                
                requestAnimationFrame(smoothScroll);
            }, 100);
            
            // Show question section after messages (without scrolling)
            setTimeout(() => {
                questionSection.style.display = 'block';
            }, 2000);
        }, 500);
    }
});

// Yes button - show final message
yesBtn.addEventListener('click', () => {
    // Create massive heart explosion
    createMassiveHeartExplosion();
    
    // Hide question section and show final section
    questionSection.style.display = 'none';
    finalSection.style.display = 'block';
    finalSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Continuous hearts falling
    setInterval(() => {
        createRandomFloatingHeart();
    }, 300);
});

// No button - it moves away and gets smaller
noBtn.addEventListener('click', (e) => {
    noBtnClickCount++;
    
    // Move the button randomly
    const container = document.querySelector('.buttons-container');
    const containerRect = container.getBoundingClientRect();
    
    // Random position within viewport
    const randomX = Math.random() * (window.innerWidth - 200);
    const randomY = Math.random() * (window.innerHeight - 100);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    
    // Make it smaller each time
    const newScale = 1 - (noBtnClickCount * 0.15);
    if (newScale > 0.3) {
        noBtn.style.transform = `scale(${newScale})`;
    } else {
        // If too small, just hide it
        noBtn.style.display = 'none';
        
        // Show a playful message
        const playfulMsg = document.createElement('p');
        playfulMsg.textContent = "I knew you couldn't say no! 😊";
        playfulMsg.style.cssText = `
            font-size: 1.3em;
            color: #ff1744;
            margin-top: 20px;
            animation: fadeInUp 0.5s ease-out;
        `;
        questionSection.appendChild(playfulMsg);
    }
});

// Make No button run away on hover too
noBtn.addEventListener('mouseenter', () => {
    if (noBtnClickCount > 0) {
        const randomX = Math.random() * (window.innerWidth - 200);
        const randomY = Math.random() * (window.innerHeight - 100);
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
    }
});

// Create heart explosion effect
function createHeartExplosion(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '❤️';
            heart.className = 'floating-heart';
            
            const angle = (Math.PI * 2 * i) / 15;
            const distance = 50 + Math.random() * 50;
            const startX = centerX + Math.cos(angle) * distance;
            const startY = centerY + Math.sin(angle) * distance;
            
            heart.style.left = startX + 'px';
            heart.style.top = startY + 'px';
            heart.style.animationDelay = (i * 0.05) + 's';
            
            floatingHeartsContainer.appendChild(heart);
            
            setTimeout(() => heart.remove(), 3000);
        }, i * 50);
    }
}

// Create massive heart explosion for final reveal
function createMassiveHeartExplosion() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = ['❤️', '💕', '💖', '💗', '💝'][Math.floor(Math.random() * 5)];
            heart.className = 'floating-heart';
            
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = window.innerHeight + 'px';
            heart.style.fontSize = (20 + Math.random() * 30) + 'px';
            
            floatingHeartsContainer.appendChild(heart);
            
            setTimeout(() => heart.remove(), 3000);
        }, i * 100);
    }
}

// Create random floating hearts
function createRandomFloatingHeart() {
    const heart = document.createElement('div');
    heart.textContent = ['❤️', '💕', '💖'][Math.floor(Math.random() * 3)];
    heart.className = 'floating-heart';
    
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = window.innerHeight + 'px';
    heart.style.fontSize = (15 + Math.random() * 20) + 'px';
    
    floatingHeartsContainer.appendChild(heart);
    
    setTimeout(() => heart.remove(), 3000);
}

// Add flip card functionality
document.addEventListener('click', (e) => {
    const card = e.target.closest('.message-card');
    if (card) {
        card.classList.toggle('flipped');
    }
});

// Helper function to create sparkle
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.textContent = '✨';
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 12px;
        pointer-events: none;
        animation: fadeOut 1s ease-out forwards;
        z-index: 9999;
    `;
    
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
}

// Add sparkle effect on mouse move (longer trail)
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.85) {
        createSparkle(e.clientX, e.clientY);
    }
});

// Add sparkle effect on click for touch devices
document.addEventListener('click', (e) => {
    // Create multiple sparkles in a small burst for clicks
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const offsetX = (Math.random() - 0.5) * 20;
            const offsetY = (Math.random() - 0.5) * 20;
            createSparkle(e.clientX + offsetX, e.clientY + offsetY);
        }, i * 50);
    }
});

// Add sparkle effect on touch for mobile devices
document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        // Create multiple sparkles in a small burst for touches
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const offsetX = (Math.random() - 0.5) * 20;
                const offsetY = (Math.random() - 0.5) * 20;
                createSparkle(touch.clientX + offsetX, touch.clientY + offsetY);
            }, i * 50);
        }
    }
});

// Add sparkle trail on touch move for mobile devices
document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        if (Math.random() > 0.85) {
            createSparkle(touch.clientX, touch.clientY);
        }
    }
});

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-30px);
        }
    }
`;
document.head.appendChild(style);

// Add some initial floating hearts in background
for (let i = 0; i < 5; i++) {
    setTimeout(() => {
        createRandomFloatingHeart();
    }, i * 1000);
}
