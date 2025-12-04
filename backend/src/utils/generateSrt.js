export const jsonToSrt = (blocks) => {
  let srt = "";
  blocks.forEach((block, index) => {
    srt += `${index + 1}\n`;
    srt += `${formatTime(block.start)} --> ${formatTime(block.end)}\n`;
    srt += `${block.text}\n\n`;
  });
  return srt;
};

const formatTime = (sec) => {
  const date = new Date(sec * 1000);
  return date.toISOString().substr(11, 12).replace(".", ",");
};
