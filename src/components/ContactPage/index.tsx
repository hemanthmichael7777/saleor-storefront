import * as React from "react";

import "./scss/index.scss";

const ContactPage: React.FC = () => 
    <div className="contact-page-info-container">

        <div className="contact-ind-container">
            <div className= "contact-title">General Inquiries</div>
            <a href="mailto:info@dominiqueapparel.com?subject=Dominique%20Inquiry">info@dominiqueapparel.com</a>
        </div>

        <div className="contact-ind-container">
            <div className= "contact-title">Returns</div>
            <a href="mailto:returns@dominiqueapparel.com?subject=Dominique%20Returns">returns@dominiqueapparel.com</a>
        </div>

        <div className="contact-ind-container">
            <div className= "contact-title">Support</div>
            <a href="mailto:support@dominiqueapparel.com?subject=Dominique%20Support">support@dominiqueapparel.com</a>
        </div>

        <div className="contact-ind-container">
            <div className= "contact-title">Press Inquiries</div>
            <a href="mailto:press@dominiqueapparel.com?subject=Dominique%20Press%20Inquiry">press@dominiqueapparel.com</a>
        </div>

        <div className="contact-ind-container">
            <div className= "contact-title">Wholesale Inquiries</div>
            <a href="mailto:wholesale@dominiqueapparel.com?subject=Dominique%20Wholesale%20Inquiry">wholesale@dominiqueapparel.com</a>
        </div>

    </div>

export default ContactPage;