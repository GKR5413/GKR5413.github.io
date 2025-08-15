# Raju Gottumukkala Portfolio Website

A modern, responsive personal portfolio website showcasing the professional experience and technical skills of Raju Gottumukkala - DevOps Engineer and Computer Science Student at UMKC.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)
- Git
- A modern web browser

### Installation & Setup

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd jonson-master
   ```

2. **Install global development tools** (if not already installed)
   ```bash
   npm install -g live-server sass http-server
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   This will open the website in your default browser at `http://localhost:3000`

## 🛠️ Development

### Available Scripts

- **`npm start`** - Start live-server with auto-reload
- **`npm run dev`** - Alternative development server command
- **`npm run serve`** - Start http-server (alternative to live-server)
- **`npm run sass:watch`** - Watch and compile SCSS files
- **`npm run sass:build`** - Build compressed CSS from SCSS
- **`npm run open`** - Open project in VS Code

### Project Structure

```
jonson-master/
├── index.html          # Homepage with hero section and overview
├── about.html          # Detailed about page with education & experience
├── portfolio.html      # Portfolio showcase and technical projects
├── blog.html           # Blog listing (ready for content)
├── blog_details.html   # Individual blog posts
├── contact.html        # Contact form and information
├── elements.html       # UI components showcase
├── assets/
│   ├── css/            # Compiled CSS files
│   ├── scss/           # SCSS source files
│   ├── js/             # JavaScript files
│   ├── img/            # Images and graphics
│   └── fonts/          # Font files
└── package.json         # Project configuration
```

### Working with SCSS

The project uses SCSS for better CSS organization. To work with SCSS:

1. **Watch for changes** (auto-compile):
   ```bash
   npm run sass:watch
   ```

2. **Build once**:
   ```bash
   npm run sass:build
   ```

3. **SCSS files are located in** `assets/scss/` and compile to `assets/css/`

## 🌐 Features

- **Responsive Design** - Works on all devices
- **Modern UI/UX** - Clean, professional aesthetic
- **Interactive Elements** - Smooth animations and transitions
- **Contact Form** - Ready for backend integration
- **Blog System** - Ready for content management
- **Portfolio Showcase** - Professional work and projects display
- **SEO Optimized** - Proper HTML structure and meta tags

## 🎯 About Raju Gottumukkala

### Professional Background
- **DevOps Engineer** at FIS Global (Jun 2022 – Jul 2023)
- **Programmer Analyst Trainee** at Cognizant Technology Solutions (Jan 2022 – Jun 2022)
- **Programming Intern** at E-Box (Apr 2020 – Jun 2020)

### Education
- **Master of Science in Computer Science** - University of Missouri-Kansas City (Aug 2023 – May 2025)
  - GPA: 3.82/4
  - Dean's International Scholarship: $8,000 per year
- **Bachelor of Technology in Computer Science and Engineering** - Lovely Professional University (Aug 2018 – May 2022)
  - CGPA: 3.33/4

### Technical Expertise
- **Cloud Technologies**: AWS (EC2, S3, Lambda, CloudFront, IAM, Elastic Beanstalk, Route 53, VPC, Aurora), Azure, Salesforce
- **DevOps & Automation**: Docker, Kubernetes, Terraform, Jenkins, GitOps, Git Actions, Ansible, SonarQube, ArgoCD, Grafana, Prometheus
- **Programming & Scripting**: Python, Java, Bash Scripting, HTML, CSS, JavaScript, SQL, YAML
- **Systems & Tools**: Linux, Git, Maven, Nginx, Memcached, RabbitMQ, Amazon Q, Generative AI

### Key Projects
- **IoT Data Security in Cloud Ecosystem** - OpenStack infrastructure with hybrid encryption (ECC, Twofish, AES)
- **Stockfeed Segregation Using Intent-Driven Publish-Subscribe** - Kafka, PostgreSQL, Java, HDFS integration

## 🎨 Customization

### Colors
Main theme colors are defined in `assets/scss/_color.scss`:
- Primary: `#670000` (Dark Red)
- Secondary: `#FFEFAE` (Light Yellow)
- Backgrounds: Various grays and whites

### Typography
Uses Poppins font family for modern, clean typography.

### Images
Replace images in `assets/img/` folders:
- `logo/` - Brand logos
- `hero/` - Hero section images
- `gallery/` - Portfolio and general images
- `blog/` - Blog post images

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🚀 Deployment

This is a static website that can be deployed to:

- **GitHub Pages** - Free hosting for public repositories
- **Netlify** - Drag & drop deployment
- **Vercel** - Fast static site hosting
- **Traditional hosting** - Any web server
- **CDN services** - For global performance

### Deployment Steps

1. **Build the project** (if using SCSS):
   ```bash
   npm run sass:build
   ```

2. **Upload files** to your hosting provider

3. **Configure domain** and SSL if needed

## 🔧 Troubleshooting

### Common Issues

1. **Port 3000 already in use**:
   ```bash
   npm run serve -- --port 3001
   ```

2. **SCSS not compiling**:
   - Ensure Sass is installed: `npm install -g sass`
   - Check file paths in SCSS imports

3. **Images not loading**:
   - Verify image paths are correct
   - Check file permissions

### Getting Help

- Check browser console for JavaScript errors
- Validate HTML at [W3C Validator](https://validator.w3.org/)
- Test CSS at [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📞 Contact

- **Email**: gottumukkala.kanakaraju@gmail.com
- **Phone**: +1 (816) 352-4975
- **LinkedIn**: [linkedin.com/in/gkr5413/](https://linkedin.com/in/gkr5413/)
- **GitHub**: [github.com/gkr5413](https://github.com/gkr5413)
- **Location**: Kansas City, MO

---

**Built with ❤️ for DevOps Engineers and Cloud Professionals**
# Thu Aug 14 19:59:35 CDT 2025
# Updated: Thu Aug 14 20:17:55 CDT 2025
# Force rebuild: Thu Aug 14 20:47:18 CDT 2025
# Last update: Thu Aug 14 20:51:08 CDT 2025 - Layout fixes applied
# Force update: Thu Aug 14 20:54:16 CDT 2025 - Layout improvements applied
