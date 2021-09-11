export function SidebarToggle() {
  document.querySelector("#sidebar")?.classList.toggle("hidden");
  ["overflow-hidden","max-h-screen","fixed"].map(v => document.querySelector("#content-wrapper")?.classList.toggle(v));
}

export function navWrapperToggle() {
  if (document.querySelector("#content-wrapper")?.classList.contains('fixed')) {
    SidebarToggle();
  }
}

// export default ({SidebarToggle, navWrapperToggle})