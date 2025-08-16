// Main Application Controller
class PortfolioApp {
    constructor() {
        this.currentPage = 'home';
        this.pages = {
            home: { title: 'Raju Gottumukkala - Home', template: 'home' },
            profile: { title: 'Raju Gottumukkala - Profile', template: 'profile' },
            experience: { title: 'Raju Gottumukkala - Experience', template: 'experience' },
            connect: { title: 'Raju Gottumukkala - Connect', template: 'connect' }
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.handleInitialRoute();
        this.setupMobileMenu();
        this.initializeAnimations();
    }

    setupEventListeners() {
        // Navigation event delegation
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-route]')) {
                e.preventDefault();
                const route = e.target.getAttribute('data-route');
                this.navigateTo(route);
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            this.handleRouteChange(window.location.pathname);
        });

        // Form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.matches('#contact-form')) {
                e.preventDefault();
                this.handleContactForm(e.target);
            }
        });
    }

    setupMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.mobile-overlay');

        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                overlay.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });
        }

        if (overlay) {
            overlay.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        }

        // Close menu when clicking on menu items
        document.addEventListener('click', (e) => {
            if (e.target.matches('.mobile-menu a')) {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    handleInitialRoute() {
        const path = window.location.pathname;
        if (path === '/' || path === '') {
            this.showPage('home');
        } else {
            this.handleRouteChange(path);
        }
    }

    handleRouteChange(path) {
        const route = path.substring(1) || 'home';
        if (this.pages[route]) {
            this.showPage(route);
        } else {
            this.showPage('home');
        }
    }

    navigateTo(route) {
        if (this.pages[route]) {
            const url = route === 'home' ? '/' : `/${route}`;
            window.history.pushState({}, '', url);
            this.showPage(route);
        }
    }

    async showPage(pageName) {
        if (this.currentPage === pageName) return;
        
        this.currentPage = pageName;
        const page = this.pages[pageName];
        
        // Update page title
        document.title = page.title;
        
        // Show loading state
        this.showLoading();
        
        try {
            // Load page content
            const content = await this.loadPageContent(pageName);
            
            // Update main content
            const mainContent = document.querySelector('main');
            if (mainContent) {
                mainContent.innerHTML = content;
            }
            
            // Update navigation active state
            this.updateNavigation(pageName);
            
            // Initialize page-specific functionality
            this.initializePage(pageName);
            
            // Hide loading
            this.hideLoading();
            
            // Scroll to top
            window.scrollTo(0, 0);
            
        } catch (error) {
            console.error('Error loading page:', error);
            this.showError('Failed to load page content');
        }
    }

    async loadPageContent(pageName) {
        // For now, we'll use the existing HTML content
        // In a real app, you might fetch this from an API
        const pageContent = {
            home: this.getHomeContent(),
            profile: this.getProfileContent(),
            experience: this.getExperienceContent(),
            connect: this.getConnectContent()
        };
        
        return pageContent[pageName] || this.getHomeContent();
    }

    getHomeContent() {
        return `
            <!-- Hero Section Start -->
            <section class="hero-area">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-6">
                            <div class="hero-content">
                                <h1 class="hero-title">Hi, I'm Raju Gottumukkala</h1>
                                <p class="hero-subtitle">Software Engineer & Technology Enthusiast</p>
                                <p class="hero-description">
                                    Passionate about creating innovative solutions and driving digital transformation. 
                                    Experienced in full-stack development, cloud technologies, and modern software practices.
                                </p>
                                <div class="hero-buttons">
                                    <a href="#" data-route="profile" class="btn btn-primary">Learn More</a>
                                    <a href="#" data-route="connect" class="btn btn-outline">Get In Touch</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="hero-image">
                                <img src="assets/img/hero/h1_hero.png" alt="Raju Gottumukkala" class="img-fluid">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Hero End -->

            <!-- About Section Start -->
            <section class="about-section section-padding">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section-title text-center mb-5">
                                <h2>About Me</h2>
                                <p>Get to know me better</p>
                            </div>
                        </div>
                    </div>
                    <div class="row align-items-center">
                        <div class="col-lg-6">
                            <div class="about-content">
                                <h3>Software Engineer with a Passion for Innovation</h3>
                                <p>
                                    I'm a dedicated software engineer with expertise in developing scalable applications 
                                    and implementing cutting-edge technologies. My journey in technology has been driven 
                                    by curiosity and a desire to solve complex problems.
                                </p>
                                <p>
                                    With experience in both frontend and backend development, I enjoy creating seamless 
                                    user experiences and robust server-side solutions. I'm always eager to learn new 
                                    technologies and contribute to meaningful projects.
                                </p>
                                <div class="about-buttons">
                                    <a href="#" data-route="profile" class="btn btn-primary">View Full Profile</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="about-image">
                                <img src="assets/img/gallery/about2.png" alt="About Raju" class="img-fluid rounded">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- About End -->

            <!-- Experience Section Start -->
            <section class="experience-section section-padding bg-light">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section-title text-center mb-5">
                                <h2>Work Experience</h2>
                                <p>My professional journey</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="experience-item">
                                <div class="experience-header">
                                    <div class="company-logo">
                                        <img src="assets/img/logo/CognizantLogo.png" alt="Cognizant" class="logo-img">
                                    </div>
                                    <div class="experience-details">
                                        <h3>Software Engineer</h3>
                                        <h4>Cognizant Technology Solutions</h4>
                                        <p class="duration">2023 - Present</p>
                                    </div>
                                </div>
                                <div class="experience-description">
                                    <p>
                                        Developing and maintaining enterprise applications using modern technologies. 
                                        Collaborating with cross-functional teams to deliver high-quality software solutions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center mt-4">
                        <a href="#" data-route="experience" class="btn btn-primary">View All Experience</a>
                    </div>
                </div>
            </section>
            <!-- Experience End -->

            <!-- Education Section Start -->
            <section class="education-section section-padding">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section-title text-center mb-5">
                                <h2>Education</h2>
                                <p>My academic background</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="education-item">
                                <div class="education-header">
                                    <div class="education-logo">
                                        <img src="assets/img/logo/UMKCLogo.png" alt="UMKC" class="logo-img">
                                    </div>
                                    <div class="education-details">
                                        <h3>Master of Science in Computer Science</h3>
                                        <h4>University of Missouri-Kansas City</h4>
                                        <p class="duration">2021 - 2023</p>
                                        <p class="gpa">GPA: 3.8/4.0</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Education End -->

            <!-- Contact Section Start -->
            <section class="contact-section section-padding bg-light">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section-title text-center mb-5">
                                <h2>Get In Touch</h2>
                                <p>Let's start a conversation</p>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-lg-8">
                            <div class="contact-info text-center">
                                <div class="contact-item mb-4">
                                    <i class="fas fa-envelope fa-2x mb-3"></i>
                                    <h4>Email</h4>
                                    <p><a href="mailto:gottumukkala.kanakaraju@gmail.com">gottumukkala.kanakaraju@gmail.com</a></p>
                                </div>
                                <div class="contact-item mb-4">
                                    <i class="fas fa-phone fa-2x mb-3"></i>
                                    <h4>Phone</h4>
                                    <p>+1 (816) 352-4975</p>
                                </div>
                                <div class="contact-item mb-4">
                                    <i class="fas fa-map-marker-alt fa-2x mb-3"></i>
                                    <h4>Location</h4>
                                    <p>Kansas City, MO</p>
                                </div>
                                <div class="contact-buttons">
                                    <a href="#" data-route="connect" class="btn btn-primary">Send Message</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Contact End -->
        `;
    }

    getProfileContent() {
        return `
            <!-- Profile Header Start -->
            <section class="profile-header section-padding">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="profile-intro text-center">
                                <div class="profile-image mb-4">
                                    <img src="assets/img/gallery/raju-profile.jpg" alt="Raju Gottumukkala" class="rounded-circle" style="width: 200px; height: 200px; object-fit: cover;">
                                </div>
                                <h1>Raju Gottumukkala</h1>
                                <p class="lead">Software Engineer & Technology Enthusiast</p>
                                <p class="text-muted">Kansas City, Missouri</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Profile Header End -->

            <!-- About Me Section Start -->
            <section class="about-me-section section-padding">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section-title mb-5">
                                <h2>About Me</h2>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="about-content">
                                <p class="mb-4">
                                    I am a passionate software engineer with a strong foundation in computer science and 
                                    a drive to create innovative solutions. My journey in technology began with curiosity 
                                    and has evolved into a professional career focused on building scalable applications.
                                </p>
                                <p class="mb-4">
                                    With expertise in both frontend and backend development, I enjoy working on full-stack 
                                    projects that challenge me to think creatively and solve complex problems. I believe 
                                    in writing clean, maintainable code and staying updated with the latest industry trends.
                                </p>
                                <p class="mb-4">
                                    When I'm not coding, you can find me exploring new technologies, contributing to 
                                    open-source projects, or sharing knowledge with the developer community.
                                </p>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="skills-section">
                                <h4>Technical Skills</h4>
                                <div class="skill-item">
                                    <span class="skill-name">JavaScript/TypeScript</span>
                                    <div class="skill-bar">
                                        <div class="skill-progress" style="width: 90%"></div>
                                    </div>
                                </div>
                                <div class="skill-item">
                                    <span class="skill-name">Python</span>
                                    <div class="skill-bar">
                                        <div class="skill-progress" style="width: 85%"></div>
                                    </div>
                                </div>
                                <div class="skill-item">
                                    <span class="skill-name">React/Node.js</span>
                                    <div class="skill-bar">
                                        <div class="skill-progress" style="width: 80%"></div>
                                    </div>
                                </div>
                                <div class="skill-item">
                                    <span class="skill-name">Cloud Technologies</span>
                                    <div class="skill-bar">
                                        <div class="skill-progress" style="width: 75%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- About Me End -->

            <!-- Experience Summary Start -->
            <section class="experience-summary section-padding bg-light">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section-title mb-5">
                                <h2>Professional Experience</h2>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="experience-card">
                                <div class="card-header">
                                    <img src="assets/img/logo/CognizantLogo.png" alt="Cognizant" class="company-logo">
                                    <div class="company-info">
                                        <h4>Software Engineer</h4>
                                        <h5>Cognizant Technology Solutions</h5>
                                        <span class="duration">2023 - Present</span>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <p>Developing enterprise applications and collaborating with cross-functional teams.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="experience-card">
                                <div class="card-header">
                                    <img src="assets/img/logo/E-BoxLogo.png" alt="E-Box" class="company-logo">
                                    <div class="company-info">
                                        <h4>Software Developer</h4>
                                        <h5>E-Box Solutions</h5>
                                        <span class="duration">2022 - 2023</span>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <p>Built web applications and contributed to software development projects.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center mt-4">
                        <a href="#" data-route="experience" class="btn btn-primary">View Detailed Experience</a>
                    </div>
                </div>
            </section>
            <!-- Experience Summary End -->
        `;
    }

    getExperienceContent() {
        return `
            <!-- Experience Header Start -->
            <section class="experience-header section-padding">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section-title text-center mb-5">
                                <h2>Work Experience</h2>
                                <p>My professional journey and achievements</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Experience Header End -->

            <!-- Work Experience Section Start -->
            <section class="work-experience section-padding">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="experience-item">
                                <div class="experience-header">
                                    <div class="company-logo">
                                        <img src="assets/img/logo/CognizantLogo.png" alt="Cognizant" class="logo-img">
                                    </div>
                                    <div class="experience-details">
                                        <h3>Software Engineer</h3>
                                        <h4>Cognizant Technology Solutions</h4>
                                        <p class="duration">2023 - Present</p>
                                    </div>
                                </div>
                                <div class="experience-description">
                                    <p>
                                        • Developing and maintaining enterprise applications using modern technologies<br>
                                        • Collaborating with cross-functional teams to deliver high-quality software solutions<br>
                                        • Implementing best practices for code quality and performance optimization<br>
                                        • Participating in code reviews and contributing to technical discussions
                                    </p>
                                </div>
                            </div>

                            <div class="experience-item">
                                <div class="experience-header">
                                    <div class="company-logo">
                                        <img src="assets/img/logo/E-BoxLogo.png" alt="E-Box" class="logo-img">
                                    </div>
                                    <div class="experience-details">
                                        <h3>Software Developer</h3>
                                        <h4>E-Box Solutions</h4>
                                        <p class="duration">2022 - 2023</p>
                                    </div>
                                </div>
                                <div class="experience-description">
                                    <p>
                                        • Built responsive web applications using modern frontend frameworks<br>
                                        • Developed RESTful APIs and backend services<br>
                                        • Collaborated with designers and product managers to implement user requirements<br>
                                        • Participated in agile development processes
                                    </p>
                                </div>
                            </div>

                            <div class="experience-item">
                                <div class="experience-header">
                                    <div class="company-logo">
                                        <img src="assets/img/logo/FISLogo.png" alt="FIS" class="logo-img">
                                    </div>
                                    <div class="experience-details">
                                        <h3>Software Engineer Intern</h3>
                                        <h4>FIS Global</h4>
                                        <p class="duration">2021 - 2022</p>
                                    </div>
                                </div>
                                <div class="experience-description">
                                    <p>
                                        • Assisted in developing financial software applications<br>
                                        • Worked on bug fixes and feature implementations<br>
                                        • Gained experience with enterprise software development practices<br>
                                        • Collaborated with senior developers on various projects
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Work Experience End -->

            <!-- Education Section Start -->
            <section class="education-section section-padding bg-light">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section-title text-center mb-5">
                                <h2>Education</h2>
                                <p>My academic achievements and learning journey</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="education-item">
                                <div class="education-header">
                                    <div class="company-logo">
                                        <img src="assets/img/logo/UMKCLogo.png" alt="UMKC" class="logo-img">
                                    </div>
                                    <div class="education-details">
                                        <h3>Master of Science in Computer Science</h3>
                                        <h4>University of Missouri-Kansas City</h4>
                                        <p class="duration">2021 - 2023</p>
                                        <p class="gpa">GPA: 3.8/4.0</p>
                                    </div>
                                </div>
                                <div class="education-description">
                                    <p>
                                        • Specialized in software engineering and web technologies<br>
                                        • Completed coursework in advanced algorithms, database systems, and software architecture<br>
                                        • Participated in research projects and academic competitions<br>
                                        • Graduated with honors
                                    </p>
                                </div>
                            </div>

                            <div class="education-item">
                                <div class="education-header">
                                    <div class="company-logo">
                                        <img src="assets/img/logo/LPULogo.png" alt="LPU" class="logo-img">
                                    </div>
                                    <div class="education-details">
                                        <h3>Bachelor of Technology in Computer Science</h3>
                                        <h4>Lovely Professional University</h4>
                                        <p class="duration">2017 - 2021</p>
                                        <p class="gpa">GPA: 3.9/4.0</p>
                                    </div>
                                </div>
                                <div class="education-description">
                                    <p>
                                        • Foundation in computer science principles and programming fundamentals<br>
                                        • Completed projects in web development, database management, and software engineering<br>
                                        • Active member of coding clubs and technical societies<br>
                                        • Graduated with distinction
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Education End -->
        `;
    }

    getConnectContent() {
        return `
            <!-- Connect Header Start -->
            <section class="connect-header section-padding">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section-title text-center mb-5">
                                <h2>Get In Touch</h2>
                                <p>Let's start a conversation about opportunities and collaborations</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Connect Header End -->

            <!-- Contact Form Section Start -->
            <section class="contact-form-section section-padding">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 mx-auto">
                            <div class="contact-form-wrapper">
                                <form id="contact-form" class="contact-form">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="name">Full Name *</label>
                                                <input type="text" id="name" name="name" class="form-control" required>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="email">Email Address *</label>
                                                <input type="email" id="email" name="email" class="form-control" required>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="subject">Subject *</label>
                                        <input type="text" id="subject" name="subject" class="form-control" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="message">Message *</label>
                                        <textarea id="message" name="message" rows="5" class="form-control" required></textarea>
                                    </div>
                                    <div class="form-group text-center">
                                        <button type="submit" class="btn btn-primary btn-lg">
                                            <i class="fas fa-paper-plane me-2"></i>
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Contact Form End -->

            <!-- Contact Info Section Start -->
            <section class="contact-info-section section-padding bg-light">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section-title text-center mb-5">
                                <h2>Contact Information</h2>
                                <p>Get in touch through any of these channels</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="contact-info-item text-center">
                                <div class="icon-wrapper mb-3">
                                    <i class="fas fa-envelope fa-3x text-primary"></i>
                                </div>
                                <h4>Email</h4>
                                <p><a href="mailto:gottumukkala.kanakaraju@gmail.com">gottumukkala.kanakaraju@gmail.com</a></p>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="contact-info-item text-center">
                                <div class="icon-wrapper mb-3">
                                    <i class="fas fa-phone fa-3x text-primary"></i>
                                </div>
                                <h4>Phone</h4>
                                <p>+1 (816) 352-4975</p>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="contact-info-item text-center">
                                <div class="icon-wrapper mb-3">
                                    <i class="fas fa-map-marker-alt fa-3x text-primary"></i>
                                </div>
                                <h4>Location</h4>
                                <p>Kansas City, Missouri</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Contact Info End -->

            <!-- Social Links Section Start -->
            <section class="social-links-section section-padding">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section-title text-center mb-5">
                                <h2>Connect With Me</h2>
                                <p>Follow me on social media and professional platforms</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="social-links-wrapper text-center">
                                <a href="https://linkedin.com/in/gkr5413/" target="_blank" class="social-link linkedin">
                                    <i class="fab fa-linkedin-in"></i>
                                    <span>LinkedIn</span>
                                </a>
                                <a href="https://github.com/gkr5413" target="_blank" class="social-link github">
                                    <i class="fab fa-github"></i>
                                    <span>GitHub</span>
                                </a>
                                <a href="mailto:gottumukkala.kanakaraju@gmail.com" class="social-link email">
                                    <i class="fas fa-envelope"></i>
                                    <span>Email</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Social Links End -->
        `;
    }

    updateNavigation(activePage) {
        // Update desktop navigation
        const navLinks = document.querySelectorAll('#navigation a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-route') === activePage) {
                link.classList.add('active');
            }
        });

        // Update mobile navigation
        const mobileNavLinks = document.querySelectorAll('.mobile-menu a');
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-route') === activePage) {
                link.classList.add('active');
            }
        });
    }

    initializePage(pageName) {
        switch (pageName) {
            case 'home':
                this.initializeHomePage();
                break;
            case 'profile':
                this.initializeProfilePage();
                break;
            case 'experience':
                this.initializeExperiencePage();
                break;
            case 'connect':
                this.initializeConnectPage();
                break;
        }
    }

    initializeHomePage() {
        // Add any home page specific functionality
        this.initializeSkillBars();
    }

    initializeProfilePage() {
        // Add any profile page specific functionality
        this.initializeSkillBars();
    }

    initializeExperiencePage() {
        // Add any experience page specific functionality
    }

    initializeConnectPage() {
        // Add any connect page specific functionality
        this.initializeContactForm();
    }

    initializeSkillBars() {
        // Animate skill bars when they come into view
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.width = entry.target.style.width;
                        entry.target.style.opacity = '1';
                    }
                });
            });
            observer.observe(bar);
        });
    }

    initializeContactForm() {
        // Add any contact form specific functionality
    }

    async handleContactForm(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            this.showSuccess('Message sent successfully! I\'ll get back to you soon.');
            form.reset();
            
        } catch (error) {
            // Show error message
            this.showError('Failed to send message. Please try again.');
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    showLoading() {
        // Create and show loading spinner
        const loading = document.createElement('div');
        loading.id = 'loading-spinner';
        loading.innerHTML = `
            <div class="loading-overlay">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `;
        document.body.appendChild(loading);
    }

    hideLoading() {
        // Remove loading spinner
        const loading = document.getElementById('loading-spinner');
        if (loading) {
            loading.remove();
        }
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
        
        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
    }

    initializeAnimations() {
        // Enhanced scroll animations with staggered effects
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered animation delay
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 100);
                }
            });
        }, observerOptions);

        // Observe all elements for animation
        const animateElements = document.querySelectorAll('.experience-item, .education-item, .contact-item, .skill-item, .form-group');
        animateElements.forEach(el => observer.observe(el));

        // Add parallax effect to hero section
        this.addParallaxEffect();
        
        // Add floating particles
        this.addFloatingParticles();
        
        // Add typing effect to hero title
        this.addTypingEffect();
        
        // Add cursor trail effect
        this.addCursorTrail();
    }

    addParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-image, .about-image');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    addFloatingParticles() {
        const heroSection = document.querySelector('.hero-area');
        if (!heroSection) return;

        // Create floating particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            heroSection.appendChild(particle);
        }
    }

    addTypingEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;

        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '3px solid white';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typing after initial animation
        setTimeout(typeWriter, 1500);
    }

    addCursorTrail() {
        const cursor = document.createElement('div');
        cursor.className = 'cursor-trail';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.7;
            transition: all 0.1s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(cursor);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.left = cursorX - 10 + 'px';
            cursor.style.top = cursorY - 10 + 'px';
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
});
