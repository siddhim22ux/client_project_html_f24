var scrollToTop = {
    settings: {
      startLine: 100, // Show button after 100px of scrolling
      scrollTo: 0, // Scroll target, 0 = top of the page
      scrollDuration: 1000, // Scroll animation duration in ms
      fadeDuration: [500, 100], // [Fade in duration, Fade out duration]
    },
    controlHTML: `
      <img alt="Scroll to top button" 
           src="https://lh3.googleusercontent.com/pw/AM-JKLW4j5JI56mukPbCeDlRHbiEY5YyFB0au3T8WmP1HEGoemIMro7RdTACmAzo8dOJj8LOFRpVehcLj-xD_VTxDc437oa3wr59L_2afRke7zpAis_UEnDLI-7C-1Mm8mN_w2A1sunBFnDnOsrXU44ifQAb=w60-h61-no" />`,
    controlAttrs: { offsetX: 5, offsetY: 5 },
    anchorKeyword: "#top",
    state: { isVisible: false, shouldBeVisible: false },
  
    scrollUp: function () {
      const scrollTarget =
        isNaN(this.settings.scrollTo) 
          ? this.settings.scrollTo 
          : parseInt(this.settings.scrollTo);
  
      const targetPosition =
        typeof scrollTarget === "string" && jQuery(`#${scrollTarget}`).length
          ? jQuery(`#${scrollTarget}`).offset().top
          : 0;
  
      this.$body.animate({ scrollTop: targetPosition }, this.settings.scrollDuration);
    },
  
    keepFixed: function () {
      const $window = jQuery(window);
      const left =
        $window.scrollLeft() +
        $window.width() -
        this.$control.width() -
        this.controlAttrs.offsetX;
      const top =
        $window.scrollTop() +
        $window.height() -
        this.$control.height() -
        this.controlAttrs.offsetY;
  
      this.$control.css({ left: `${left}px`, top: `${top}px` });
    },
  
    toggleControl: function () {
      const scrollTop = jQuery(window).scrollTop();
      this.state.shouldBeVisible = scrollTop >= this.settings.startLine;
  
      if (this.state.shouldBeVisible && !this.state.isVisible) {
        this.$control.stop().animate({ opacity: 1 }, this.settings.fadeDuration[0]);
        this.state.isVisible = true;
      } else if (!this.state.shouldBeVisible && this.state.isVisible) {
        this.$control.stop().animate({ opacity: 0 }, this.settings.fadeDuration[1]);
        this.state.isVisible = false;
      }
    },
  
    init: function () {
      jQuery(document).ready(() => {
        const self = this;
        self.$body = jQuery("html, body");
  
        // Append the control to the footer landmark
        self.$control = jQuery(`<div id="topcontrol">${self.controlHTML}</div>`)
          .css({
            position: "fixed",
            bottom: self.controlAttrs.offsetY,
            right: self.controlAttrs.offsetX,
            opacity: 0,
            cursor: "pointer",
          })
          .attr({ title: "Scroll to Top" })
          .click(() => {
            self.scrollUp();
            return false;
          })
          .appendTo("#topcontrol-wrapper"); // Append to the wrapper inside <footer>
  
        self.toggleControl();
  
        jQuery(`a[href="${self.anchorKeyword}"]`).click(() => {
          self.scrollUp();
          return false;
        });
  
        jQuery(window).on("scroll resize", () => self.toggleControl());
      });
    },
  };
  
  // Initialize the scrollToTop functionality
  scrollToTop.init();
  