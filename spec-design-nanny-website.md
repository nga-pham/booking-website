# Requirement
We need to create a list of pet facilities and pet shops and connect them with potential users. We already have connections. The idea is similar to booking.com or Agoda page
# System analysis and design for booking nanny website
The website consists of 6 pages, a header and a footer
## 1. Landing page
The most important page, consists of 5 sections:
### 1.1. Booking section
Include a place to advertise, and a booking form for customers to book services. 
* To advertise the page: use a photo and a slogan.
* To book services: booking form with: services (confinement nanny, one time / ad hoc, recurring / long-term), date picker, number of babies, in grid styles. And button "continue".

(if signed in needed)
When a customer clicks this button, the system will ask if they have already signed up.

- if they've already signed up: the system will change to sign in form.
- if they've not: the system will change to sign up form, instructing them to create an account and come back to sign in form.

After signing in, the system will redirect to result page to choose the options.

(if we don't need authentication)
When button "continue" is clicked, the system will redirect to result page to choose the options.

* payment page: User will pay deposit and click button "send request"...

### 1.2. Instruction section
* Include a media highlighting how to book, a step-by step instruction
* The media should be a video or slideshow showing how to book services.
The instruction should have a title, and a paragraph showing each step’s detail. The steps are presented in a vertical direction.

### 1.3. List of service providers / Popular pet caregivers
Show the list of current nanny providers, in grid style.
Each card contains: photos of nanny, name, experience (years), expertise (special skills), star rating, address

### 1.4. Testimonials
A place to show the reviews from customers (mostly positive reviews). Should be shown as a slideshow of cards. Each card contains: image and name of customer, his review, his star rating.

### 2. Header
A logo redirect to home page
A menu: 
* Services (confinement nanny, one time / ad hoc, recurring / long-term)
* Pricing
* FAQ
* Contact / About us
* Become a nanny

### 3. Footer
Contain 4 sections:
* Section 1: a logo and link to social network, information (phone, address…)
* Section 2: Find services, links to each service page
* Section 3: Privacy policy, terms and conditions, about us

## 4. Service page
## 5. Result page

After signing in, the system will redirect to result page to choose the options:
* First, user can see a simple search: To refine the search, user can fill in keywords (same as in landing page) in the simpler form and click button "search".
* Then, user can see a breadcrumbs: current page’s location within a navigational hierarchy.
* Then, a filter on the left. The filter includes:
  - Name: text box to fill in the name of nanny
  - Experience (years): range to choose minimum experience
  - Available time: Time picker to choose the available time
  - Star rating: range to choose minimum star rating
  - District: checkbox to choose available districts
* The options are on the right, are a list of nannies, each with: photos, name, their experience (years), expertise, star rating, address, and their available time. 
User then can look at each nanny, see if someone is match, choose someone to see details (redirect to detail page). Or a button "Book now" to book directly.
When user clicks button "Book now", the system will redirect to detail page with booking section.

(booking detail page)

After completing it, user will pay deposit and click button "send request". Their information will be saved in the system and they will be redirected to payment page.

### If signed in needed

### if we don't need authentication


A payment form will appear, showing that they should fill in a detail form (first name, last name, email address, id number, etc...), and button "send request". 
Their information will be saved in the system and they will be redirected to payment page.

## 6. “Contact us” page + FAQ

