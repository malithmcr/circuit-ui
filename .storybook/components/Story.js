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

import { Story as StorybookStory } from '@storybook/addon-docs';

import Preview from './Preview';

// eslint-disable-next-line react/prop-types
const Story = ({ withToolbar = true, ...props }) => (
  <Preview withToolbar={withToolbar}>
    <StorybookStory {...props} />
  </Preview>
);

export default Story;
