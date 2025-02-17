/**
 * Copyright 2020, SumUp Ltd.
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

/* eslint-disable react/display-name */

import { Delete, Add, Download } from '@sumup/icons';
import { Placement } from '@popperjs/core';
import * as Collector from '@sumup/collector';

import { act, axe, RenderFn, render, userEvent } from '../../util/test-utils';
import { ClickEvent } from '../../types/events';

import {
  PopoverItem,
  PopoverItemProps,
  Popover,
  PopoverProps,
} from './Popover';

jest.mock('@sumup/collector');

const placements: Placement[] = ['auto', 'top', 'bottom', 'left', 'right'];

describe('PopoverItem', () => {
  function renderPopoverItem<T>(
    renderFn: RenderFn<T>,
    props: PopoverItemProps,
  ) {
    return renderFn(<PopoverItem {...props} />);
  }

  const baseProps = { children: 'PopoverItem' };

  describe('styles', () => {
    it('should render as Link when an href (and onClick) is passed', () => {
      const props = {
        ...baseProps,
        href: 'https://sumup.com',
        onClick: jest.fn(),
        icon: Download,
      };
      const { container } = renderPopoverItem(render, props);
      const anchorEl = container.querySelector('a');
      expect(anchorEl).toBeVisible();
    });

    it('should render as a `button` when an onClick is passed', () => {
      const props = { ...baseProps, onClick: jest.fn(), icon: Download };
      const { container } = renderPopoverItem(render, props);
      const buttonEl = container.querySelector('button');
      expect(buttonEl).toBeVisible();
    });
  });

  describe('business logic', () => {
    it('should call onClick when rendered as Link', () => {
      const props = {
        ...baseProps,
        href: 'https://sumup.com',
        onClick: jest.fn((event: ClickEvent) => {
          event.preventDefault();
        }),
        icon: Download,
      };
      const { container } = renderPopoverItem(render, props);
      const anchorEl = container.querySelector('a');
      if (anchorEl) {
        userEvent.click(anchorEl);
      }
      expect(props.onClick).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Popover', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  function renderPopover(props: PopoverProps) {
    return render(<Popover {...props} />);
  }

  const dispatch = jest.fn();
  // @ts-expect-error TypeScript doesn't allow assigning to the read-only
  // useClickTrigger
  Collector.useClickTrigger = jest.fn(() => dispatch);

  function createStateSetter(initialState: boolean) {
    return (state: boolean | ((prev: boolean) => boolean)) =>
      typeof state === 'boolean' ? state : state(initialState);
  }

  const baseProps: PopoverProps = {
    component: (triggerProps) => <button {...triggerProps}>Button</button>,
    actions: [
      {
        onClick: jest.fn(),
        children: 'Add',
        icon: Add,
      },
      { type: 'divider' },
      {
        onClick: jest.fn(),
        children: 'Remove',
        icon: Delete,
        destructive: true,
      },
    ],
    isOpen: true,
    onToggle: jest.fn(createStateSetter(true)),
    tracking: { label: 'test-popover' },
  };

  describe('styles', () => {
    it('should render with default styles', () => {
      const { baseElement } = renderPopover(baseProps);
      expect(baseElement).toMatchSnapshot();
    });

    it('should render with closed styles', () => {
      const { baseElement } = renderPopover({ ...baseProps, isOpen: false });
      expect(baseElement).toMatchSnapshot();
    });

    it.each(placements)('should render popover on %s', (placement) => {
      const { baseElement } = renderPopover({ ...baseProps, placement });

      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('business logic', () => {
    it('should open the popover when clicking the trigger element', () => {
      const isOpen = false;
      const onToggle = jest.fn(createStateSetter(isOpen));
      const { getByRole } = renderPopover({ ...baseProps, isOpen, onToggle });

      const popoverTrigger = getByRole('button');

      act(() => {
        userEvent.click(popoverTrigger);
      });

      expect(onToggle).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledTimes(1);
    });

    it.each([
      ['space', '{space}'],
      ['enter', '{enter}'],
      ['arrow down', '{arrowDown}'],
      ['arrow up', '{arrowUp}'],
    ])(
      'should open the popover when pressing the %s key on the trigger element',
      (_, key) => {
        const isOpen = false;
        const onToggle = jest.fn(createStateSetter(isOpen));
        const { getByRole } = renderPopover({ ...baseProps, isOpen, onToggle });

        const popoverTrigger = getByRole('button');

        act(() => {
          popoverTrigger.focus();
          userEvent.keyboard(key);
        });

        expect(onToggle).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(1);
      },
    );

    it('should close the popover when clicking outside', () => {
      renderPopover(baseProps);

      act(() => {
        userEvent.click(document.body);
      });

      expect(baseProps.onToggle).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledTimes(1);
    });

    it('should close the popover when clicking the trigger element', () => {
      const { getByRole } = renderPopover(baseProps);

      const popoverTrigger = getByRole('button');

      act(() => {
        userEvent.click(popoverTrigger);
      });

      expect(baseProps.onToggle).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledTimes(1);
    });

    it.each([
      ['space', '{space}'],
      ['enter', '{enter}'],
      ['arrow up', '{arrowUp}'],
    ])(
      'should close the popover when pressing the %s key on the trigger element',
      (_, key) => {
        const { getByRole } = renderPopover(baseProps);

        const popoverTrigger = getByRole('button');

        act(() => {
          popoverTrigger.focus();
          userEvent.keyboard(key);
        });

        expect(baseProps.onToggle).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(1);
      },
    );

    it('should close the popover when clicking the escape key', () => {
      renderPopover(baseProps);

      act(() => {
        userEvent.keyboard('{escape}');
      });

      expect(baseProps.onToggle).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledTimes(1);
    });

    it('should close the popover when clicking a popover item', () => {
      const { getAllByRole } = renderPopover(baseProps);

      const popoverItems = getAllByRole('menuitem');

      act(() => {
        userEvent.click(popoverItems[0]);
      });

      expect(baseProps.onToggle).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledTimes(1);
    });

    it('should move focus to the first popover item after opening', () => {
      const isOpen = false;
      const onToggle = jest.fn(createStateSetter(isOpen));

      const { getAllByRole, rerender } = renderPopover({
        ...baseProps,
        isOpen,
        onToggle,
      });

      act(() => {
        rerender(<Popover {...baseProps} isOpen />);
      });

      const popoverItems = getAllByRole('menuitem');

      expect(popoverItems[0]).toHaveFocus();
    });

    it('should move focus to the trigger element after closing', () => {
      const { getByRole, rerender } = renderPopover(baseProps);

      act(() => {
        rerender(<Popover {...baseProps} isOpen={false} />);
      });

      const popoverTrigger = getByRole('button');

      expect(popoverTrigger).toHaveFocus();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const { container } = renderPopover(baseProps);

      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
