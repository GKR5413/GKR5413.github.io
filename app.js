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
                                <p class="hero-subtitle">DevOps Engineer & Cloud Technology Specialist</p>
                                <p class="hero-description">
                                    Passionate about cloud infrastructure, automation, and DevOps practices. 
                                    Experienced in AWS, Kubernetes, Docker, and CI/CD pipelines. 
                                    Currently pursuing Master's in Computer Science at UMKC with Dean's International Scholarship.
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
                                <h3>DevOps Engineer with Cloud & Automation Expertise</h3>
                                <p>
                                    I'm a dedicated DevOps Engineer with proven experience in cloud infrastructure, 
                                    automation, and CI/CD pipelines. My expertise spans AWS, Kubernetes, Docker, 
                                    and various DevOps tools that drive operational excellence.
                                </p>
                                <p>
                                    Currently pursuing my Master's in Computer Science at UMKC with a 3.82/4.0 GPA, 
                                    I'm passionate about implementing scalable solutions and optimizing development workflows. 
                                    My experience includes reducing deployment failures by 15% and improving system observability.
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
                                        <img src="assets/img/logo/fis-lg.png" alt="FIS Global" class="logo-img">
                                    </div>
                                    <div class="experience-details">
                                        <h3>DevOps Engineer</h3>
                                        <h4>Fidelity National Information Services, Inc. (FIS Global)</h4>
                                        <p class="duration">Jun 2022 – Jul 2023</p>
                                    </div>
                                </div>
                                <div class="experience-description">
                                    <p>
                                        • Automated cloud infrastructure provisioning for Worldpay, resulting in 20% faster provisioning<br>
                                        • Deployed highly available microservices, reducing release failures by 15%<br>
                                        • Improved incident resolution speed, lowering MTTR by 20%<br>
                                        • Implemented Terraform-based deployments on AWS with Kubernetes orchestration
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
                                        <p class="duration">Aug 2023 – May 2025</p>
                                        <p class="gpa">GPA: 3.82/4.0</p>
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
                                <p class="lead">DevOps Engineer & Cloud Technology Specialist</p>
                                <p class="text-muted">Kansas City, Missouri</p>
                                <div class="achievement-badge mt-3">
                                    <span class="badge bg-success">Dean's International Scholarship - $8,000/year</span>
                                </div>
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
                                    I am a passionate DevOps Engineer with expertise in cloud infrastructure, automation, 
                                    and CI/CD pipelines. My journey in technology has been driven by a desire to optimize 
                                    development workflows and implement scalable solutions.
                                </p>
                                <p class="mb-4">
                                    Currently pursuing my Master's in Computer Science at UMKC with a 3.82/4.0 GPA, 
                                    I have proven experience in reducing deployment failures by 15%, improving system 
                                    observability, and automating cloud infrastructure provisioning.
                                </p>
                                <p class="mb-4">
                                    My expertise spans AWS, Kubernetes, Docker, Terraform, and various DevOps tools. 
                                    I'm passionate about implementing Infrastructure-as-Code practices and building 
                                    robust CI/CD pipelines that drive operational excellence.
                                </p>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="skills-section">
                                <h4>Core Skills</h4>
                                <div class="skill-item">
                                    <span class="skill-name">AWS Cloud</span>
                                    <div class="skill-bar">
                                        <div class="skill-progress" style="width: 95%"></div>
                                    </div>
                                </div>
                                <div class="skill-item">
                                    <span class="skill-name">Kubernetes & Docker</span>
                                    <div class="skill-bar">
                                        <div class="skill-progress" style="width: 90%"></div>
                                    </div>
                                </div>
                                <div class="skill-item">
                                    <span class="skill-name">Terraform & CI/CD</span>
                                    <div class="skill-bar">
                                        <div class="skill-progress" style="width: 88%"></div>
                                    </div>
                                </div>
                                <div class="skill-item">
                                    <span class="skill-name">Python & Java</span>
                                    <div class="skill-bar">
                                        <div class="skill-progress" style="width: 85%"></div>
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
                                    <img src="assets/img/logo/fis-lg.png" alt="FIS Global" class="company-logo">
                                    <div class="company-info">
                                        <h4>DevOps Engineer</h4>
                                        <h5>FIS Global</h5>
                                        <span class="duration">Jun 2022 – Jul 2023</span>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <p>Automated cloud infrastructure, reduced deployment failures by 15%, and improved system observability.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="experience-card">
                                <div class="card-header">
                                    <img src="assets/img/logo/CognizantLogo.png" alt="Cognizant" class="company-logo">
                                    <div class="company-info">
                                        <h4>Programmer Analyst Trainee</h4>
                                        <h5>Cognizant Technology Solutions</h5>
                                        <span class="duration">Jan 2022 – Jun 2022</span>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <p>Developed Salesforce automation workflows and contributed to agile sprint deliveries.</p>
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
                                        <img src="assets/img/logo/fis-lg.png" alt="FIS Global" class="logo-img">
                                    </div>
                                    <div class="experience-details">
                                        <h3>DevOps Engineer</h3>
                                        <h4>Fidelity National Information Services, Inc. (FIS Global)</h4>
                                        <p class="duration">Jun 2022 – Jul 2023</p>
                                    </div>
                                </div>
                                <div class="experience-description">
                                    <p>
                                        • Automated cloud infrastructure provisioning for Worldpay, resulting in 20% faster provisioning and improved consistency, by implementing Terraform-based deployments on AWS (EC2, S3, RDS) with standardized Infrastructure-as-Code practices.<br>
                                        • Deployed highly available and reliable microservices, reducing release failures by 15%, by orchestrating Docker containers with Kubernetes (EKS) and building Continuous Integration / Continuous Deployment pipelines using Jenkins and GitLab CI/CD with automated tests and quality checks.<br>
                                        • Improved incident resolution speed and system observability, lowering MTTR by 20%, by integrating AWS CloudWatch and developing custom monitoring dashboards.<br>
                                        • Collaborated with development and operations teams to troubleshoot deployment failures, analyze system logs, and fine-tune rollback and recovery procedures, minimizing downtime during production rollouts.<br>
                                        • Contributed to production support tasks by addressing deployment failures, analyzing system logs, and improving deployment rollback and recovery processes to minimize downtime.
                                    </p>
                                </div>
                            </div>

                            <div class="experience-item">
                                <div class="experience-header">
                                    <div class="company-logo">
                                        <img src="assets/img/logo/CognizantLogo.png" alt="Cognizant" class="logo-img">
                                    </div>
                                    <div class="experience-details">
                                        <h3>Programmer Analyst Trainee</h3>
                                        <h4>Cognizant Technology Solutions Corp (CTS)</h4>
                                        <p class="duration">Jan 2022 – Jun 2022</p>
                                    </div>
                                </div>
                                <div class="experience-description">
                                    <p>
                                        • Improved internal data accuracy by ~15% and reduced manual data errors by ~20% by developing Salesforce automation workflows using Apex, Process Builder, RESTful APIs, custom triggers, Lightning components, and validation logic.<br>
                                        • Contributed to on-time agile sprint deliveries by supporting requirement gathering, functional testing, and deployment processes, ensuring smoother feature rollouts and stable production releases.
                                    </p>
                                </div>
                            </div>

                            <div class="experience-item">
                                <div class="experience-header">
                                    <div class="company-logo">
                                        <img src="assets/img/logo/E-BoxLogo.png" alt="E-Box" class="logo-img">
                                    </div>
                                    <div class="experience-details">
                                        <h3>Programming Intern</h3>
                                        <h4>E-Box, India</h4>
                                        <p class="duration">Apr 2020 – Jun 2020</p>
                                    </div>
                                </div>
                                <div class="experience-description">
                                    <p>
                                        • Integrated university street-view data into the official website using HTML, CSS, JavaScript, and Google Maps API, enabling interactive campus tours.<br>
                                        • Improved website engagement by ~20% through detailed navigation across campus locations. Collaborated with University IT teams to ensure smooth integration and optimized cross-device performance.
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
                                    <div class="education-logo">
                                        <img src="assets/img/logo/UMKCLogo.png" alt="UMKC" class="logo-img">
                                    </div>
                                    <div class="education-details">
                                        <h3>Master of Science in Computer Science</h3>
                                        <h4>University of Missouri-Kansas City</h4>
                                        <p class="duration">Aug 2023 – May 2025</p>
                                        <p class="gpa">GPA: 3.82/4.0</p>
                                    </div>
                                </div>
                                <div class="education-description">
                                    <p>
                                        • Relevant Coursework: Cloud Computing, Advanced Operating Systems, Design and Analysis of Algorithms, Network Architecture, Data Science, Cryptography, Information Security Assurance, Principles of Big Data Management, Internet of Things, Statistical Learning<br>
                                        • Dean's International Scholarship: Awarded $8,000 per year for academic excellence<br>
                                        • Currently pursuing with focus on cloud technologies and DevOps practices
                                    </p>
                                </div>
                            </div>

                            <div class="education-item">
                                <div class="education-header">
                                    <div class="education-logo">
                                        <img src="assets/img/logo/LPULogo.png" alt="LPU" class="logo-img">
                                    </div>
                                    <div class="education-details">
                                        <h3>Bachelor of Technology in Computer Science and Engineering</h3>
                                        <h4>Lovely Professional University</h4>
                                        <p class="duration">Aug 2018 – May 2022</p>
                                        <p class="gpa">GPA: 3.33/4.0</p>
                                    </div>
                                </div>
                                <div class="education-description">
                                    <p>
                                        • Relevant Coursework: Object Oriented Programming, Data Structures and Algorithms, Programming in Java, Artificial Intelligence, Software Engineering, Virtualization and Cloud Computing, Computer Networking, Operating Systems, Python Programming, Database Management<br>
                                        • Active member of coding clubs and technical societies<br>
                                        • Completed projects in web development, database management, and software engineering
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Education End -->

            <!-- Projects Section Start -->
            <section class="projects-section section-padding">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section-title text-center mb-5">
                                <h2>Academic Projects</h2>
                                <p>Research and development work at UMKC</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="project-item">
                                <div class="project-header">
                                    <h3>IoT Data Security in Cloud Ecosystem</h3>
                                    <p class="project-duration">Aug 2024 – Dec 2024</p>
                                </div>
                                <div class="project-description">
                                    <p>
                                        • Designed and implemented a secure cloud-based system for real-time IoT data transmission using OpenStack infrastructure and hybrid encryption techniques including ECC, Twofish, and AES, ensuring confidentiality and integrity of sensitive data streams.<br>
                                        • Achieved over 95% system uptime through deployment of a fault-tolerant architecture and simulation of edge-to-cloud communication scenarios under various network conditions to validate encryption robustness and scalability.
                                    </p>
                                </div>
                            </div>

                            <div class="project-item">
                                <div class="project-header">
                                    <h3>Stockfeed Segregation Using Intent-Driven Publish-Subscribe</h3>
                                    <p class="project-duration">Jan 2024 – May 2024</p>
                                </div>
                                <div class="project-description">
                                    <p>
                                        • Developed a real-time stockfeed segregation platform using Intent-Driven Publish-Subscribe (IDPS) architecture, integrating Kafka, PostgreSQL, and Java to classify high-volume data streams dynamically and reduce overall data latency by 20%.<br>
                                        • Incorporated Hadoop Distributed File System (HDFS) to enable scalable data storage and retrieval, and implemented intent-based message filtering logic for faster, more accurate routing of financial data to relevant consumers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Projects End -->
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
