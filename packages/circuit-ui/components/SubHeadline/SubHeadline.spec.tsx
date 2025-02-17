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

import { create, renderToHtml, axe } from '../../util/test-utils';

import { SubHeadline } from './SubHeadline';

describe('SubHeadline', () => {
  /**
   * Style tests.
   */
  const elements = ['h2', 'h3', 'h4', 'h5', 'h6'] as const;
  it.each(elements)('should render as %s element', (element) => {
    const subheading = create(
      <SubHeadline as={element}>{`${element} subheading`}</SubHeadline>,
    );
    expect(subheading).toMatchSnapshot();
  });

  it('should render with no margin styles when passed the noMargin prop', () => {
    const actual = create(<SubHeadline as="h3" noMargin />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<SubHeadline as="h3">Subheading</SubHeadline>);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
