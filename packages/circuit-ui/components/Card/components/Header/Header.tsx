/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { FC, ReactNode } from 'react';
import { css } from '@emotion/react';

import { ClickEvent } from '../../../../types/events';
import styled, { StyleProps } from '../../../../styles/styled';
import {
  CloseButton,
  CloseButtonProps,
} from '../../../CloseButton/CloseButton';
import { TrackingProps } from '../../../../hooks/useClickEvent';

type CloseProps =
  | {
      /**
       * Callback for the close button. If not specified, the button won't
       * be shown.
       */
      onClose?: (event: ClickEvent) => void;
      /**
       * Text label for the close button for screen readers.
       * Important for accessibility.
       */
      closeButtonLabel?: string;
    }
  | { onClose?: never; closeButtonLabel?: never };

export type CardHeaderProps = {
  /**
   * Headline to be shown.
   */
  children?: ReactNode;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
} & CloseProps;

type ContainerElProps = Pick<CardHeaderProps, 'children'>;

const baseStyles = ({ theme }: StyleProps) => css`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacings.giga};
`;

const noHeadlineStyles = ({ children }: ContainerElProps) =>
  Array.isArray(children) &&
  !children[0] &&
  css`
    justify-content: flex-end;
  `;

const CardHeaderContainer = styled('header')<ContainerElProps>(
  baseStyles,
  noHeadlineStyles,
);

const closeButtonStyles = ({ theme }: StyleProps) => css`
  margin-top: -${theme.spacings.byte};
  margin-right: -${theme.spacings.mega};
  margin-bottom: -${theme.spacings.byte};
`;

const CardHeaderCloseButton =
  styled(CloseButton)<CloseButtonProps>(closeButtonStyles);

/**
 * Header used in the Card component. Used for styling and alignment
 * purposes only.
 */
export const CardHeader: FC<CardHeaderProps> = ({
  onClose,
  children,
  closeButtonLabel,
  tracking,
  ...props
}) => (
  <CardHeaderContainer {...props}>
    {children}
    {onClose && closeButtonLabel && (
      <CardHeaderCloseButton
        onClick={onClose}
        label={closeButtonLabel}
        tracking={
          tracking ? { component: 'close-button', ...tracking } : undefined
        }
      />
    )}
  </CardHeaderContainer>
);
