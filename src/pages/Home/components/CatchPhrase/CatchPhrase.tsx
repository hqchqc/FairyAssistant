import { Flex } from '@taroify/core';
import './CatchPhrase.less';

interface CatchPhraseProps {}

const CatchPhrase: React.FC<CatchPhraseProps> = () => {
  return (
    <Flex direction="column" align="center" className="quotesPart">
      <Flex.Item>⭐🧡✨</Flex.Item>
      <Flex.Item className="quotes">努力一分钟，老公会不同。</Flex.Item>
    </Flex>
  );
};

export default CatchPhrase;
