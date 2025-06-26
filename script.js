// Portfolio Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Active navigation highlight
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightActiveSection() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
    
    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight && rect.bottom > 0) {
                const width = bar.getAttribute('data-width');
                if (width && !bar.style.width) {
                    bar.style.width = width;
                }
            }
        });
    };
    
    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars();
    
    // Form submission handling
    const contactForm = document.querySelector('.form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Message sent successfully! I will get back to you soon.', 'success');
            this.reset();
        });
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4ecdc4' : '#00d4ff'};
            color: #0a0a0a;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 4000);
    }
    
    // Download resume button handling
    const downloadResumeBtn = document.getElementById('download-resume');
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Resume download will be available soon!', 'info');
            // You can add actual resume download functionality here
            // Example: window.open('path/to/your/resume.pdf', '_blank');
        });
    }

    // Certification verify links
    document.querySelectorAll('.verify-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Certification verification links will be updated with actual URLs', 'info');
        });
    });

    // Blog read more links
    document.querySelectorAll('.blog-read-more').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Blog posts will be available soon!', 'info');
        });
    });

    // Blog CTA button
    const blogCta = document.querySelector('.blog-cta .btn');
    if (blogCta) {
        blogCta.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Blog section coming soon with more articles!', 'info');
        });
    }

    // Enhanced Typewriter Effect
    const typewriterElement = document.getElementById('typewriter');
    const texts = ['DevOps Engineer & Full Stack Developer', 'Miracle Okoli'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;

    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isWaiting) {
            setTimeout(() => {
                isWaiting = false;
                isDeleting = true;
                typeWriter();
            }, 2000); // Wait 2 seconds before starting to delete
            return;
        }
        
        if (isDeleting) {
            // Deleting characters
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length; // Move to next text
                setTimeout(typeWriter, 500); // Small pause before typing next text
                return;
            }
            
            setTimeout(typeWriter, 50); // Faster deletion
        } else {
            // Typing characters
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentText.length) {
                isWaiting = true;
                typeWriter();
                return;
            }
            
            setTimeout(typeWriter, 100); // Normal typing speed
        }
    }

    // Start the typewriter effect after a short delay
    setTimeout(() => {
        typeWriter();
    }, 1000);

    // Dynamic Code Block System
    function initializeDynamicCode() {
        const codeBlocks = [
            {
                filename: 'kubernetes-deploy.yml',
                content: [
                    { type: 'keyword', text: 'apiVersion:', indent: 0 },
                    { type: 'string', text: 'apps/v1', indent: 0 },
                    { type: 'keyword', text: 'kind:', indent: 0 },
                    { type: 'string', text: 'Deployment', indent: 0 },
                    { type: 'keyword', text: 'metadata:', indent: 0 },
                    { type: 'indent', text: 'name:', indent: 1 },
                    { type: 'string', text: 'production-app', indent: 0 }
                ]
            },
            {
                filename: 'infrastructure.tf',
                content: [
                    { type: 'keyword', text: 'resource', indent: 0 },
                    { type: 'string', text: '"aws_instance" "app"', indent: 0 },
                    { type: 'keyword', text: '{', indent: 0 },
                    { type: 'indent', text: 'ami', indent: 1 },
                    { type: 'string', text: '= "ami-0c02fb55956c7d316"', indent: 0 },
                    { type: 'indent', text: 'instance_type', indent: 1 },
                    { type: 'string', text: '= "t3.medium"', indent: 0 }
                ]
            },
            {
                filename: 'docker-compose.yml',
                content: [
                    { type: 'keyword', text: 'version:', indent: 0 },
                    { type: 'string', text: '"3.8"', indent: 0 },
                    { type: 'keyword', text: 'services:', indent: 0 },
                    { type: 'indent', text: 'app:', indent: 1 },
                    { type: 'indent', text: 'build:', indent: 2 },
                    { type: 'string', text: '.', indent: 0 },
                    { type: 'indent', text: 'ports:', indent: 2 }
                ]
            },
            {
                filename: 'ansible-playbook.yml',
                content: [
                    { type: 'keyword', text: '- name:', indent: 0 },
                    { type: 'string', text: 'Deploy Application', indent: 0 },
                    { type: 'keyword', text: 'hosts:', indent: 0 },
                    { type: 'string', text: 'production', indent: 0 },
                    { type: 'keyword', text: 'tasks:', indent: 0 },
                    { type: 'indent', text: '- name:', indent: 1 },
                    { type: 'string', text: 'Update packages', indent: 0 }
                ]
            },
            {
                filename: '.github/workflows/deploy.yml',
                content: [
                    { type: 'keyword', text: 'name:', indent: 0 },
                    { type: 'string', text: 'CI/CD Pipeline', indent: 0 },
                    { type: 'keyword', text: 'on:', indent: 0 },
                    { type: 'indent', text: 'push:', indent: 1 },
                    { type: 'indent', text: 'branches:', indent: 2 },
                    { type: 'string', text: '[ main ]', indent: 0 },
                    { type: 'keyword', text: 'jobs:', indent: 0 }
                ]
            }
        ];

        let currentIndex = 0;
        const codeFileName = document.getElementById('codeFileName');
        const codeContent = document.getElementById('codeContent');
        const codeDots = document.querySelectorAll('.code-dot');

        function updateCodeBlock() {
            const block = codeBlocks[currentIndex];
            
            // Update filename with fade effect
            codeFileName.style.opacity = '0';
            
            setTimeout(() => {
                codeFileName.textContent = block.filename;
                codeFileName.style.opacity = '1';
            }, 200);

            // Update code content with fade effect
            codeContent.style.opacity = '0';
            
            setTimeout(() => {
                codeContent.innerHTML = '';
                
                block.content.forEach(line => {
                    const codeLine = document.createElement('div');
                    codeLine.className = 'code-line';
                    
                    let content = '';
                    const indentSpaces = '    '.repeat(line.indent);
                    
                    if (line.type === 'keyword') {
                        content = `<span class="code-keyword">${line.text}</span>`;
                    } else if (line.type === 'string') {
                        content = ` <span class="code-string">${line.text}</span>`;
                    } else if (line.type === 'indent') {
                        content = `${indentSpaces}<span class="code-indent">${line.text}</span>`;
                    } else if (line.type === 'number') {
                        content = ` <span class="code-number">${line.text}</span>`;
                    }
                    
                    codeLine.innerHTML = content;
                    codeContent.appendChild(codeLine);
                });
                
                codeContent.style.opacity = '1';
            }, 200);

            // Update dots
            codeDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex % 3);
            });

            // Move to next code block
            currentIndex = (currentIndex + 1) % codeBlocks.length;
        }

        // Initial update
        updateCodeBlock();

        // Set interval to change code blocks every 4 seconds
        setInterval(updateCodeBlock, 4000);
    }

    // Initialize dynamic code
    initializeDynamicCode();

    // View More Projects Functionality
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    let isExpanded = false;

    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function() {
            isExpanded = !isExpanded;
            
            if (isExpanded) {
                // Show hidden projects
                hiddenProjects.forEach((project, index) => {
                    setTimeout(() => {
                        project.classList.add('show');
                    }, index * 100); // Stagger the animation
                });
                
                // Update button text and icon
                this.querySelector('.btn-text').textContent = 'View Less Projects';
                this.classList.add('expanded');
            } else {
                // Hide projects
                hiddenProjects.forEach(project => {
                    project.classList.remove('show');
                    setTimeout(() => {
                        if (!project.classList.contains('show')) {
                            project.style.display = 'none';
                        }
                    }, 600); // Wait for animation to complete
                });
                
                // Update button text and icon
                this.querySelector('.btn-text').textContent = 'View More Projects';
                this.classList.remove('expanded');
                
                // Scroll to projects section
                document.getElementById('projects').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Console message for developers
    console.log('🚀 DevOps Engineer Portfolio - Built with modern web technologies');
});

// Additional animations
const additionalStyles = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
