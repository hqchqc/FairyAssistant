import { Flex } from '@taroify/core';
import './CatchPhrase.less';

interface CatchPhraseProps {}

const CatchPhrase: React.FC<CatchPhraseProps> = () => {
  return (
    <Flex direction="column" align="center" className="quotesPart">
      <Flex.Item>β­π§‘β¨</Flex.Item>
      <Flex.Item className="quotes">εͺεδΈειοΌθε¬δΌδΈεγ</Flex.Item>
    </Flex>
  );
};

export default CatchPhrase;
