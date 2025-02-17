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

import { Breakpoints, MediaQueries } from '../types';

export function createMediaQueries(breakpoints: Breakpoints): MediaQueries {
  return Object.keys(breakpoints).reduce((allMediaQueries, breakpoint) => {
    const typedBreakpoint = breakpoint as keyof Breakpoints;
    const value = breakpoints[typedBreakpoint];

    // eslint-disable-next-line no-param-reassign
    allMediaQueries[typedBreakpoint] = `@media ${value}`;

    return allMediaQueries;
  }, {} as MediaQueries);
}
