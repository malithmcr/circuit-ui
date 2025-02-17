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

import { create, renderToHtml, axe } from '../../../../util/test-utils';

import TableHeader from '.';

const children = 'Foo';

describe('TableHeader', () => {
  describe('Style tests', () => {
    it('should render with default styles', () => {
      const actual = create(<TableHeader>{children}</TableHeader>);
      expect(actual).toMatchSnapshot();
    });

    it('should render with row styles', () => {
      const actual = create(<TableHeader scope="row">{children}</TableHeader>);
      expect(actual).toMatchSnapshot();
    });

    it('should render with sortable styles', () => {
      const actual = create(
        <TableHeader
          sortParams={{
            sortable: true,
            sortLabel: 'Sort in ascending order',
            isSorted: false,
          }}
        >
          {children}
        </TableHeader>,
      );
      expect(actual).toMatchSnapshot();
    });

    it('should render with hovered styles', () => {
      const actual = create(<TableHeader isHovered>{children}</TableHeader>);
      expect(actual).toMatchSnapshot();
    });

    it('should render with condensed styles', () => {
      const actual = create(<TableHeader condensed>{children}</TableHeader>);
      expect(actual).toMatchSnapshot();
    });

    describe('sortable + sorted', () => {
      it('should render with sortable + sorted ascending styles', () => {
        const actual = create(
          <TableHeader
            sortParams={{
              sortable: true,
              sortDirection: 'ascending',
              sortLabel: 'Sort in descending order',
              isSorted: true,
            }}
          >
            {children}
          </TableHeader>,
        );
        expect(actual).toMatchSnapshot();
      });

      it('should render with sortable + sorted descending styles', () => {
        const actual = create(
          <TableHeader
            sortParams={{
              sortable: true,
              sortDirection: 'descending',
              sortLabel: 'Sort in ascending order',
              isSorted: true,
            }}
          >
            {children}
          </TableHeader>,
        );
        expect(actual).toMatchSnapshot();
      });
    });
  });

  describe('Accessibility tests', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(
        <TableHeader
          sortParams={{
            sortable: true,
            sortLabel: 'Sort in ascending order',
            isSorted: false,
          }}
        >
          {children}
        </TableHeader>,
      );
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
