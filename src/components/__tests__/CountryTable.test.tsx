import React from 'react'
import TestRenderer from 'react-test-renderer';
import CountryTable from '../CountryTable';

jest.useFakeTimers()

describe('src/components/CountryTable', () => {
    const mockedParams = {
        route: { params: { list: [] } }
    };

    const mockedParamsFull = {
        route: { params: { list: [1, 3, 5, 6, 8] } }
    };

    it('renders correctly', () => {
        const instance = TestRenderer.create(<CountryTable {...mockedParams} />).toJSON();
        expect(instance).toMatchSnapshot();
    })

    it('renders sections table', () => {
        const instance = TestRenderer.create(<CountryTable {...mockedParams} />).toJSON();
        expect(instance.children.length).toBe(2);
    })

    it('renders sections data', () => {
        const instance = TestRenderer.create(<CountryTable {...mockedParamsFull} />).toJSON();
        expect(instance.children[0].children.length).toBe(2);
    })
})