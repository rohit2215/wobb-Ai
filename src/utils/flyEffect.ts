/**
 * Animates a profile avatar image cloning and flying toward the "My List" button.
 * Triggers a scale bounce on the target button upon completion.
 */
export function animateFlyToCart(
  avatarImg: HTMLImageElement | null,
  imageSrc: string
) {
  const targetBtn = document.getElementById("my-list-trigger");
  if (!targetBtn || !avatarImg) return;

  const startRect = avatarImg.getBoundingClientRect();
  const targetRect = targetBtn.getBoundingClientRect();

  // Create duplicate floating clone image
  const clone = document.createElement("img");
  clone.src = imageSrc;
  clone.style.position = "fixed";
  clone.style.left = `${startRect.left}px`;
  clone.style.top = `${startRect.top}px`;
  clone.style.width = `${startRect.width}px`;
  clone.style.height = `${startRect.height}px`;
  clone.style.borderRadius = "50%";
  clone.style.zIndex = "9999";
  clone.style.pointerEvents = "none";
  clone.style.transition = "all 1.25s cubic-bezier(0.19, 1, 0.22, 1)";
  
  // Custom shadow highlight during flight
  clone.style.boxShadow = "0 8px 24px rgba(99, 102, 241, 0.4)";

  document.body.appendChild(clone);

  // Trigger requestAnimationFrame to enable CSS transition
  requestAnimationFrame(() => {
    // Fly clone to center coordinates of target button
    clone.style.left = `${targetRect.left + targetRect.width / 2 - 12}px`;
    clone.style.top = `${targetRect.top + targetRect.height / 2 - 12}px`;
    clone.style.width = "24px";
    clone.style.height = "24px";
    clone.style.opacity = "0.3";
    clone.style.transform = "scale(0.2) rotate(360deg)";
  });

  // Clean up element and bounce trigger button
  setTimeout(() => {
    clone.remove();
    
    // Bounce animation class toggle
    targetBtn.style.transform = "scale(1.12)";
    targetBtn.style.borderColor = "#818cf8"; // indigo-400 border highlight
    targetBtn.style.backgroundColor = "#e0e7ff"; // indigo-100 bg highlight
    targetBtn.style.transition = "all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    
    setTimeout(() => {
      targetBtn.style.transform = "none";
      targetBtn.style.borderColor = "";
      targetBtn.style.backgroundColor = "";
    }, 180);
  }, 1250);
}
