import sys
import os

# Install fpdf2 if not present
try:
    from fpdf import FPDF
except ImportError:
    print("Installing fpdf2 library...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "fpdf2"])
    from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        if self.page_no() == 1:
            return
        self.set_font('Helvetica', 'B', 10)
        self.set_text_color(100, 116, 139)
        self.cell(0, 10, 'SHOPEZ : E-commerce Application | Project Documentation', 0, 0, 'L')
        self.cell(0, 10, 'KOTA MEHER MADHURI', 0, 1, 'R')
        self.line(10, 20, 200, 20)
        self.ln(5)
        
    def footer(self):
        self.set_y(-15)
        self.set_font('Helvetica', 'I', 8)
        self.set_text_color(148, 163, 184)
        self.cell(0, 10, f'Page {self.page_no()}/{{nb}}', 0, 0, 'C')

def build_pdf():
    pdf = PDF()
    pdf.alias_nb_pages()
    pdf.add_page()
    
    # ---------------- PAGE 1: COVER PAGE ----------------
    pdf.set_y(60)
    pdf.set_font('Helvetica', 'B', 28)
    pdf.set_text_color(30, 41, 59)
    pdf.cell(0, 15, 'Full Stack Development', 0, 1, 'C')
    pdf.cell(0, 15, 'with MERN', 0, 1, 'C')
    
    pdf.ln(10)
    pdf.set_font('Helvetica', 'B', 18)
    pdf.set_text_color(243, 156, 18) # Gold accent
    pdf.cell(0, 10, 'Project Documentation', 0, 1, 'C')
    
    pdf.set_y(150)
    pdf.set_font('Helvetica', 'B', 12)
    pdf.set_text_color(71, 85, 105)
    pdf.cell(0, 8, 'PROJECT TITLE:', 0, 1, 'C')
    pdf.set_font('Helvetica', '', 14)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(0, 8, 'SHOPEZ : E-commerce Application', 0, 1, 'C')
    
    pdf.ln(10)
    pdf.set_font('Helvetica', 'B', 12)
    pdf.set_text_color(71, 85, 105)
    pdf.cell(0, 8, 'TEAM MEMBER & ROLE:', 0, 1, 'C')
    pdf.set_font('Helvetica', '', 14)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(0, 8, 'KOTA MEHER MADHURI (Lead Full-Stack Developer)', 0, 1, 'C')
    
    pdf.set_y(240)
    pdf.set_font('Helvetica', 'I', 10)
    pdf.set_text_color(100, 116, 139)
    pdf.cell(0, 8, 'SmartBridge Virtual Internship Program', 0, 1, 'C')
    pdf.cell(0, 8, 'MERN Stack Development Capstone Deliverable', 0, 1, 'C')
    
    # ---------------- PAGE 2: CONTENT ----------------
    pdf.add_page()
    pdf.set_y(25)
    
    # Section Heading helper
    def add_section(title):
        pdf.ln(5)
        pdf.set_font('Helvetica', 'B', 14)
        pdf.set_text_color(30, 41, 59)
        pdf.cell(0, 10, title, 0, 1, 'L')
        pdf.line(10, pdf.get_y() - 1, 200, pdf.get_y() - 1)
        pdf.ln(3)

    def add_bullet(label, desc):
        pdf.set_font('Helvetica', 'B', 10)
        pdf.set_text_color(71, 85, 105)
        pdf.write(6, f"  * {label}: ")
        pdf.set_font('Helvetica', '', 10)
        pdf.set_text_color(15, 23, 42)
        pdf.write(6, f"{desc}\n")
        
    add_section('1. Introduction')
    add_bullet('Project Title', 'SHOPEZ : E-commerce Application')
    add_bullet('Team Members', 'KOTA MEHER MADHURI (Lead Full-Stack Developer)')
    add_bullet('Affiliation', 'SmartBridge Virtual Internship Program')
    
    add_section('2. Project Overview')
    pdf.set_font('Helvetica', '', 10)
    pdf.set_text_color(15, 23, 42)
    overview_text = (
        "ShopEZ is a modern, responsive full-stack e-commerce web application designed to offer "
        "an effortless online shopping experience. It simplifies the user journey from viewing catalog "
        "items to final billing, and provides robust, fault-tolerant offline capabilities when MongoDB "
        "database servers are unreachable."
    )
    pdf.multi_cell(0, 6, overview_text)
    pdf.ln(2)
    
    pdf.set_font('Helvetica', 'B', 11)
    pdf.set_text_color(30, 41, 59)
    pdf.cell(0, 8, 'Key Features & Functionalities:', 0, 1, 'L')
    add_bullet('Secure Authentication', 'JWT-based registration & login with local storage fallback.')
    add_bullet('Interactive Catalog', 'Dynamic grid listing fallback catalog items instantly.')
    add_bullet('Interactive Checkout Wizard', '4-step checkout form flow inside the Cart page.')
    add_bullet('Flexible Payments', 'Supports Credit/Debit cards, UPI handles, and Cash on Delivery (COD).')
    add_bullet('Inline Benefit Overlays', 'Interactive modal screens for Shipping, Security, and Returns.')
    add_bullet('Infinite Scrolling Marquee', 'Dynamic horizontal scrolling ticker banner on the homepage.')

    add_section('3. Architecture')
    add_bullet('Frontend', 'React.js (v19) utilizing component-driven architecture. State management is synchronized via global React Context Providers (AuthContext and CartContext) to persist checkout details.')
    add_bullet('Backend', 'Node.js and Express.js REST APIs with route-level security, mongoose database connection controls, and in-memory mock fallback layers.')
    add_bullet('Database', 'MongoDB cloud database. Handled with `bufferCommands: false` to prevent buffering timeouts during database access errors.')
    add_bullet('Schemas', 'User Schema (credentials & admin role), Product Schema (items details), and Cart Schema (holds current user checkout items list).')

    # ---------------- PAGE 3: SETUP & CODE ----------------
    pdf.add_page()
    pdf.set_y(25)
    
    add_section('4. Setup Instructions')
    add_bullet('Prerequisites', 'Node.js (v18+), MongoDB Atlas Database, and npm package manager.')
    add_bullet('Clone Project', 'git clone https://github.com/mehermadhuri/ShopEz-MERN.git')
    add_bullet('Install dependencies', 'Run `npm install` inside the root, server/ and client/ directories.')
    add_bullet('Environment config', 'Configure a server/.env file containing PORT=5000, MONGO_URI, and JWT_SECRET.')

    add_section('5. Folder Structure')
    add_bullet('Client Directory', '/src/components (Navbar), /src/context (Auth & Cart state), /src/pages (Cart, Products, Home, Login, Register, Shipping), /src/services (api.js)')
    add_bullet('Server Directory', '/config (db connection), /controllers (auth, cart, products logic), /models (schemas), /routes (endpoints)')

    add_section('6. Running the Application')
    add_bullet('Frontend start', 'Run `npm start` inside the client/ folder (runs on http://localhost:3000)')
    add_bullet('Backend start', 'Run `npm start` inside the server/ folder (runs on http://localhost:5000)')

    add_section('7. API Documentation')
    pdf.set_font('Helvetica', '', 10)
    pdf.set_text_color(15, 23, 42)
    add_bullet('POST /api/auth/register', 'Register account. Payload: {name, email, password}')
    add_bullet('POST /api/auth/login', 'User sign-in. Payload: {email, password}')
    add_bullet('GET /api/products', 'Fetches catalog list.')
    add_bullet('GET /api/cart/:userId', 'Fetches active user cart.')
    add_bullet('POST /api/cart/add', 'Adds product item to cart. Payload: {userId, product}')
    add_bullet('POST /api/cart/remove', 'Removes item from cart. Payload: {userId, productId}')
    add_bullet('POST /api/cart/clear', 'Clears cart on checkout success. Payload: {userId}')

    # ---------------- PAGE 4: OTHER DETAILS ----------------
    pdf.add_page()
    pdf.set_y(25)

    add_section('8. Authentication')
    pdf.set_font('Helvetica', '', 10)
    pdf.set_text_color(15, 23, 42)
    auth_text = (
        "User sessions are managed via JSON Web Tokens (JWT). Passwords are securely hashed on "
        "registration using bcryptjs before storage. The client stores authentication state inside "
        "localStorage. If the database server is offline, authentication switches dynamically to "
        "browser local storage validation so the frontend remains fully functional."
    )
    pdf.multi_cell(0, 6, auth_text)

    add_section('9. User Interface')
    add_bullet('Scrolling Marquee', 'An infinite horizontal scrolling loop showing Why Choose ShopEz values on the home page.')
    add_bullet('Checkout Wizard', 'A multi-step checkout form flow for shipping details and payment entry.')
    add_bullet('Inline Modals', 'Shipping, Returns, and Safety terms open as overlay dialogs directly inside the Cart page.')

    add_section('10. Testing')
    add_bullet('Frontend Tests', 'Configured Jest assertions inside App.test.js to verify the ShopEz brand. Passed non-interactively.')
    add_bullet('API Verification', 'Executed backend tests verifying response statuses 200/201 on auth endpoints.')

    add_section('11. Screenshots or Demo')
    add_bullet('Screenshots', 'Saved visual UI assets in the /screenshots directory of your workspace.')
    add_bullet('Demo Video', 'Prepare and link your screen recording demo video here.')

    add_section('12. Known Issues')
    add_bullet('MongoDB connection', 'Mongoose query buffering has been disabled. Connection drops are intercepted instantly, triggering fallback offline mode.')

    add_section('13. Future Enhancements')
    add_bullet('Live Payments', 'Integration with Stripe or Razorpay API gateways.')
    add_bullet('Admin Inventory', 'Enable store managers to add or delete items from the product grid directly via the UI.')

    # Save to file
    output_filename = "SHOPEZ_Project_Documentation.pdf"
    pdf.output(output_filename)
    print(f"PDF successfully created: {output_filename}")

if __name__ == '__main__':
    build_pdf()
