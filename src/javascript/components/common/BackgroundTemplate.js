export default function BackgroundTemplate({ tag, id, className, extra, template }) {
  const templateContent = template ?? '';
  const myTag = tag ?? 'div';
  const myId = id ? `id='${id}'` : '';
  const myClassName = className ? `class='${className}'` : '';
  const myExtra = extra ? `${extra}` : '';
  return `<${myTag} ${myId} ${myClassName} ${myExtra}>${templateContent}</${myTag}>`;
}
