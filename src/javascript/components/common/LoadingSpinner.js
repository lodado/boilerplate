export default function LoadingSpinner(text = undefined) {
  const textContent = text ?? '로딩 중 입니다..';

  return `
    <div class="alarm-background">
        <div class="loading-spanner" />
        </div>
        ${textContent}
    <div>
      `;
}
