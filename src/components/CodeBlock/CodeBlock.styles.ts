import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  border-radius: 8px;
  background: var(--bg-l3-solid);
  border: 1px solid var(--border-secondary);
  overflow: hidden;
`;

export const CopyButton = styled.div`
  position: absolute;
  top: 4px;
  right: 8px;
`;

export const Pre = styled.pre`
  margin: 0;
  padding: 16px;
  overflow-x: auto;
  font-family: 'Skiff Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 13px;
  line-height: 1.6;

  .token.comment {
    color: var(--text-disabled);
  }
  .token.string,
  .token.attr-value {
    color: var(--accent-green-primary);
  }
  .token.keyword {
    color: var(--accent-pink-primary);
  }
  .token.function,
  .token.class-name {
    color: var(--accent-blue-primary);
  }
  .token.tag,
  .token.builtin {
    color: var(--accent-orange-primary);
  }
  .token.attr-name,
  .token.property {
    color: var(--accent-yellow-primary);
  }
  .token.punctuation,
  .token.operator {
    color: var(--text-secondary);
  }
  .token.number,
  .token.boolean {
    color: var(--accent-dark-blue-primary);
  }
`;

export const Code = styled.code`
  color: var(--text-primary);
  white-space: pre;
`;
