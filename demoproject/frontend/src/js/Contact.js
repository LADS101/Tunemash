import '../css/Contact.css';

function Contact() {
  return (
    <div className="contact">
      
      <form action="#" method="post">
        <h1>Contact Us</h1>
        <p>Want to share your experience? Tune us</p>

        <div class="column">
          <label for="the-name">Your Name</label>
          <input type="text" name="name" id="the-name" />

          <label for="the-email">Email Address</label>
          <input type="email" name="email" id="the-email" />

          <label for="the-phone">Phone Number</label>
          <input type="tel" name="phone" id="the-phone" />

          <label for="the-reason">How can we help you?</label>

          <select name="reason" id="the-reason">
            <option value="">Choose one</option>
            <option value="web">CS 411</option>
            <option value="video">CS 411</option>
            <option value="3d">CS 411</option>
          </select>
        </div>

        <div class="column">
          <label for="the-message">Message</label>
          <textarea name="message" id="the-message"></textarea>
          <label>
          <input type="checkbox" name="newsletter" value="yes" /> Join our mailing list?
          </label>
          <input type="submit" value="Send Message" />
        </div>
      </form>
    </div>
  );
}

export default Contact;