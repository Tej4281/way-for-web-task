function startCounting(elementId, start = 1, end = 1000, interval = 10000) {
  let current = start;

  const counterElement = document.getElementById(elementId);

  const intervalId = setInterval(() => {
    counterElement.textContent = current + " +";
    if (current >= end) {
      clearInterval(intervalId);
    } else {
      current++;
    }
  }, interval);
}

// Call the function for the four counters
startCounting("counter1", 1, 200, 1);
startCounting("counter2", 1, 320, 1);
startCounting("counter3", 1, 500, 1);
startCounting("counter4", 1, 600, 1);

/*	CHECK FOR PREFERED REDUCED MOTION
		AND IF SO, DO NOT RUN ANY OF THE SCRIPTS
		SPLITTING THE LIST ELEMENT INTO MULTIPLE
		LISTS OR APPLYING THE SCROLL ANIMATION
*/
const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
if (mediaQuery && !mediaQuery.matches) {
  const tagScroller = document.querySelector(".tag-scroller");
  const allTags = tagScroller.querySelectorAll("li");

  function createElement(tagName, className = "") {
    const elem = document.createElement(tagName);
    elem.className = className;
    return elem;
  }

  function scrollersFrom(elements, numColumns = 2) {
    const fragment = new DocumentFragment();
    elements.forEach((element, i) => {
      const column = i % numColumns;
      const children = fragment.children;
      if (!children[column])
        fragment.appendChild(createElement("ul", "tag-list"));
      children[column].appendChild(element);
    });
    return fragment;
  }

  /*	SPLIT THE LIST ELEMENT INTO TWO LISTS
			AND CALL THE ANIMATION
	*/
  const scrollers = scrollersFrom(allTags, 2);
  tagScroller.innerHTML = "";
  tagScroller.appendChild(scrollers);
  addScrolling();

  /*	ADD scrolling CLASS TO THE WRAPPER ELEMENT,
			CLONE EACH LIST ITEM TO MAKE THE LIST LONG ENOUGH
			FOR INFINITE SCROLL AND THEN CALCULATE THE DURATION
			BASED ON WIDTH OF EACH SCROLLER TO MAKE THEM
			MOVE AT THE SAME RATE OF SPEED
			
			DEPENDING ON THE WIDTH OF .tag-scrollers, THE NUMBER OF
			LIST ITEMS AND THEIR INDIVIDUAL WIDTH, YOU MIGHT NEED
			TO CLONE THEM TWO TIMES EACH TO BE SURE EACH .tag-scroller
			WILL BE WIDE ENOUGH TO SUPPORT INFINITE SCROLL
			
			THIS COULD OF COURSE BE ADDED TO THE SCRIPT
			BUT FOR OUR USE CASE, WE KNOW THE MINIMUM NUMBER OF
			LIST ELEMENTS WILL BE ENOUGH FOR ONE CLONE EACH
	*/
  function addScrolling() {
    tagScroller.classList.add("scrolling");
    document.querySelectorAll(".tag-list").forEach((tagList) => {
      const scrollContent = Array.from(tagList.children);
      scrollContent.forEach((listItem) => {
        const clonedItem = listItem.cloneNode(true);
        clonedItem.setAttribute("aria-hidden", true);
        tagList.appendChild(clonedItem);
      });
      tagList.style.setProperty("--duration", tagList.clientWidth / 100 + "s");
    });
  }
}

// testimonial js

const testimonialsContainer = document.querySelector(".testimonials-container");
const testimonial = document.querySelector(".testimonial");
const userImage = document.querySelector(".user-image");
const username = document.querySelector(".username");
const role = document.querySelector(".role");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const progressDots = document.getElementById("progress-dots");

const testimonials = [
  {
    name: "June Cha",
    position: "Software Engineer",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "This guy is an amazing frontend developer that delivered the task exactly how we need it, do your self a favor and hire him, you will not be disappointed by the work delivered. He will go the extra mile to make sure that you are happy with your project. I will surely work again with him!",
  },
  {
    name: "Iida Niskanen",
    position: "Data Entry",
    photo: "https://randomuser.me/api/portraits/women/67.jpg",
    text: "This guy is a hard worker. Communication was also very good with him and he was very responsive all the time, something not easy to find in many freelancers. We'll definitely repeat with him.",
  },
  {
    name: "Renee Sims",
    position: "Receptionist",
    photo: "https://randomuser.me/api/portraits/women/8.jpg",
    text: "This guy does everything he can to get the job done and done right. This is the second time I've hired him, and I'll hire him again in the future.",
  },
  {
    name: "Sasha Ho",
    position: "Accountant",
    photo:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb",
    text: "This guy is a top notch designer and front end developer. He communicates well, works fast and produces quality work. We have been lucky to work with him!",
  },
  {
    name: "Veeti Seppanen",
    position: "Director",
    photo: "https://randomuser.me/api/portraits/men/97.jpg",
    text: "This guy is a young and talented IT professional, proactive and responsible, with a strong work ethic. He is very strong in PSD2HTML conversions and HTML/CSS technology. He is a quick learner, eager to learn new technologies. He is focused and has the good dynamics to achieve due dates and outstanding results.",
  },
];

let idx = 0;

testimonials.forEach((testimonial) => {
  const dot = document.createElement("div");
  dot.classList.add("progress-dot");
  progressDots.appendChild(dot);
});

function displayTestimonial() {
  const { name, position, photo, text } = testimonials[idx];

  testimonial.innerHTML = text;
  userImage.src = photo;
  username.innerHTML = name;
  role.innerHTML = position;

  updateProgressDots();
}

function updateProgressDots() {
  const dots = progressDots.children;
  [...dots].forEach((dot) => {
    dot.classList.remove("active");
  });
  dots[idx].classList.add("active");
}

btnNext.addEventListener("click", () => {
  idx === testimonials.length - 1 ? (idx = 0) : idx++;
  console.log(idx);

  displayTestimonial();
});

btnPrev.addEventListener("click", () => {
  idx === 0 ? (idx = testimonials.length - 1) : idx--;
  console.log(idx);

  displayTestimonial();
});

displayTestimonial();

// faq section js
const items = document.querySelectorAll(".accordion button");

function toggleAccordion() {
  const itemToggle = this.getAttribute("aria-expanded");

  for (i = 0; i < items.length; i++) {
    items[i].setAttribute("aria-expanded", "false");
  }

  if (itemToggle == "false") {
    this.setAttribute("aria-expanded", "true");
  }
}

items.forEach((item) => item.addEventListener("click", toggleAccordion));

// social media js

const input = document.getElementById("text");
const copyButton = document.getElementById("copy");

const copyText = (e) => {
  // window.getSelection().selectAllChildren(textElement);
  input.select(); //select input value
  document.execCommand("copy");
  e.currentTarget.setAttribute("tooltip", "Copied!");
};

const resetTooltip = (e) => {
  e.currentTarget.setAttribute("tooltip", "Copy to clipboard");
};

copyButton.addEventListener("click", (e) => copyText(e));
copyButton.addEventListener("mouseover", (e) => resetTooltip(e));









