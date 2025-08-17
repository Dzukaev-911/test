document.addEventListener('DOMContentLoaded', function () {
    // Main slider navigation
    const firstNft = document.querySelector('.firstNft');
    const leftBtn = document.querySelector('.left');
    const rightBtn = document.querySelector('.right');

    // Catalog slider navigation
    const catalogSlider = document.querySelector('.nft-slider');
    const catalogPrev = document.querySelector('.catalog-prev');
    const catalogNext = document.querySelector('.catalog-next');

    // Timer functionality
    const timers = document.querySelectorAll('.timer');
    const timerData = [
        { hours: 7, minutes: 9, seconds: 12 },
        { hours: 7, minutes: 9, seconds: 12 },
        { hours: 7, minutes: 9, seconds: 12 },
        { hours: 19, minutes: 9, seconds: 12 },
        { hours: 19, minutes: 9, seconds: 12 }
    ];

    // Update timer display
    function updateTimerDisplay() {
        timers.forEach((timer, index) => {
            const time = timerData[index];
            timer.textContent = `${time.hours.toString().padStart(2, '0')}h ${time.minutes.toString().padStart(2, '0')}m ${time.seconds.toString().padStart(2, '0')}s`;
        });
    }

    // Countdown function
    function updateTimers() {
        timerData.forEach(time => {
            if (time.seconds > 0) {
                time.seconds--;
            } else {
                if (time.minutes > 0) {
                    time.minutes--;
                    time.seconds = 59;
                } else {
                    if (time.hours > 0) {
                        time.hours--;
                        time.minutes = 59;
                        time.seconds = 59;
                    }
                }
            }
        });
        updateTimerDisplay();
    }

    // Main slider functionality
    const nftImages = [
        './nft1.png',
        './nft2.png',
        './nft3.png'
    ];
    let currentNftIndex = 0;

    leftBtn.addEventListener('click', function () {
        currentNftIndex = (currentNftIndex - 1 + nftImages.length) % nftImages.length;
        firstNft.src = nftImages[currentNftIndex];
        firstNft.alt = `Featured NFT ${currentNftIndex + 1}`;
    });

    rightBtn.addEventListener('click', function () {
        currentNftIndex = (currentNftIndex + 1) % nftImages.length;
        firstNft.src = nftImages[currentNftIndex];
        firstNft.alt = `Featured NFT ${currentNftIndex + 1}`;
    });

    // Catalog slider functionality
    catalogPrev.addEventListener('click', function () {
        catalogSlider.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    });

    catalogNext.addEventListener('click', function () {
        catalogSlider.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    });

    // Initialize timers
    updateTimerDisplay();
    setInterval(updateTimers, 1000);

    // Auto-scroll catalog
    let autoScroll = setInterval(() => {
        catalogSlider.scrollBy({
            left: 300,
            behavior: 'smooth'
        });

        // Reset to start if at end
        if (catalogSlider.scrollLeft + catalogSlider.clientWidth >= catalogSlider.scrollWidth - 10) {
            setTimeout(() => {
                catalogSlider.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            }, 1000);
        }
    }, 5000);

    catalogSlider.addEventListener('mouseenter', () => {
        clearInterval(autoScroll);
    });

    catalogSlider.addEventListener('mouseleave', () => {
        autoScroll = setInterval(() => {
            catalogSlider.scrollBy({
                left: 300,
                behavior: 'smooth'
            });

            if (catalogSlider.scrollLeft + catalogSlider.clientWidth >= catalogSlider.scrollWidth - 10) {
                setTimeout(() => {
                    catalogSlider.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    });
                }, 1000);
            }
        }, 5000);
    });
});
