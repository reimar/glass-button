class GlassButton extends HTMLElement {
	static register(tagName) {
		if ("customElements" in window) {
			customElements.define(tagName || "glass-button", GlassButton);
		}
	}

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = `
      <style>
          :host {
              -webkit-user-select: none;
              display: inline-block;
              user-select: none;
          }

          /* button */

          :host button {
              --blur: 8px;
              --highLightIntensity: 0.75;
              --lightAngle: -20deg;
              --strokeWidth: 1.5px;

              align-items: center;
              appearance: none;
              backdrop-filter: blur(var(--blur)) saturate(120%);
              background: rgba(255, 255, 255, 0.025);
              border-radius: 24px;
              border: 0;
              box-shadow: inset 0 0 12px rgba(255, 255, 255, 0.1), 0px 0px 3px rgba(0, 0, 0, 0.03), 0px 2px 13px rgba(0, 0, 0, 0.05), 0px 3px 28px rgba(0, 0, 0, 0.08), 0px 6px 50px rgba(0, 0, 0, 0.1);
              display: flex;
              font-size: 16px;
              gap: 0;
              line-height: 16px;
              height: 48px;
              outline-offset: calc(var(--strokeWidth) * -1);
              outline: rgba(255, 255, 255, 0.05) var(--strokeWidth) solid;
              overflow: hidden;
              transition: all 100ms ease-in-out;
          }

          :host(:not([hide-label])) button {
              padding: 16px 24px;
          }

          :host([hide-label]) button {
              padding: 16px 12px;
          }
          
          :host button:hover {
              background: rgba(255, 255, 255, 0.05);
              backdrop-filter: blur(var(--blur)) saturate(140%);
              cursor: pointer;
          }

          :host button:active {
              background: rgba(255, 255, 255, 0.025);
              transition: all 50ms ease-out;
              transform: scale(1.075, 0.975);
          }

          /* label */

          :host .label {
              color: white;
              display: block;
              position: relative;
              z-index: 3;
          }

          :host([hide-label]) .label {
              display: none;
          }

          /* icons */

          :host(:not([hide-label])) button:has(.label) [name="icon-left"] {
              left: -12px;
          }

          :host(:not([hide-label])) button:has(.label) [name="icon-right"] {
              right: -12px;
          }

          :host [name*="icon"] {
              color: white;
              display: block;
              position: relative;
          }

          ::slotted(svg) {
              stroke: currentcolor;
              fill: none;
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-width: 1.5px;
              height: 24px;
              width: 24px;
          }

          /* glass details */

          :host [class*="highlight"] {
              border: white var(--strokeWidth) solid;
              border-radius: inherit;
              content: "";
              inset: 0;
              position: absolute;
              z-index: 2;
              filter: blur(0.3px);
          }

          :host .highlight-1-base {
              opacity: calc(var(--highLightIntensity) / 4);
              mask-image: linear-gradient(var(--lightAngle), transparent 50%, black);
          }

          :host .highlight-1-spot {
              opacity: calc(var(--highLightIntensity) / 2);
              mask-image: linear-gradient(var(--lightAngle), transparent 80%, black);
          }

          :host .highlight-2-base {
              opacity: calc(var(--highLightIntensity) / 4);
              mask-image: linear-gradient(calc(180deg - var(--lightAngle) * -1), transparent 50% 0, black);
          }

          :host .highlight-2-spot {
              opacity: calc(var(--highLightIntensity) / 2);
              mask-image: linear-gradient(calc(180deg - var(--lightAngle) * -1), transparent 80% 0, black);
          }
      </style>
      <button>
          <slot name="icon-left"></slot>
          <slot class="label"></slot>
          <slot name="icon-right"></slot>
          <span class="highlight-1-base"></span>
          <span class="highlight-1-spot"></span>
          <span class="highlight-2-base"></span>
          <span class="highlight-2-spot"></span>
      </button>
    `;
	}

	// connectedCallback() {
	// 	this.$button = this.shadowRoot.querySelector("button");

	// 	this.addEventListener("mousemove", (e) => {
	// 		const x = e.offsetX;
	// 		const y = e.offsetY;
	// 		const height = this.offsetHeight;
	// 		const width = this.offsetWidth;

	// 		let offsetY = 0;
	// 		let offsetX = 0;
	// 	});

	// 	this.addEventListener("mouseleave", (e) => {
	// 		this.$button.style.transform = "";
	// 	});
	// }
}

GlassButton.register();
