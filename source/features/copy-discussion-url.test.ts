import {describe, expect, test} from 'vitest';

import {getCopyableDiscussionUrl} from './copy-discussion-url.js';

describe('getCopyableDiscussionUrl', () => {
    test.each([
        [
            'https://github.com/refined-github/refined-github/issues/123',
            'https://github.com/refined-github/refined-github/issues/123',
        ],
        [
            'https://github.com/refined-github/refined-github/pull/456',
            'https://github.com/refined-github/refined-github/pull/456',
        ],
        [
            'https://github.com/refined-github/refined-github/issues/123?foo=bar',
            'https://github.com/refined-github/refined-github/issues/123',
        ],
        [
            'https://github.com/refined-github/refined-github/pull/456?diff=split#discussion_r1',
            'https://github.com/refined-github/refined-github/pull/456',
        ],
        [
            'https://github.com/octo-org/example-repo/issues/7#issuecomment-1',
            'https://github.com/octo-org/example-repo/issues/7',
        ],
    ])('returns a canonical discussion URL for %s', (input, expected) => {
        expect(getCopyableDiscussionUrl(input)).toBe(expected);
    });

    test.each([
        'https://github.com/refined-github/refined-github',
        'https://github.com/refined-github/refined-github/issues',
        'https://github.com/refined-github/refined-github/pulls',
        'https://github.com/refined-github/refined-github/issues/new',
        'https://github.com/refined-github/refined-github/issues/abc',
        'https://github.com/refined-github/refined-github/pull/abc',
        'https://github.com/refined-github/refined-github/commit/1234567',
        'https://github.com/refined-github/refined-github/compare/main...next',
        'https://github.com/refined-github/refined-github/discussions/123',
        'https://gist.github.com/refined-github/123',
        'https://example.com/refined-github/refined-github/issues/123',
        'not a valid URL',
    ])('returns undefined for unsupported URL %s', input => {
        expect(getCopyableDiscussionUrl(input)).toBeUndefined();
    });
});