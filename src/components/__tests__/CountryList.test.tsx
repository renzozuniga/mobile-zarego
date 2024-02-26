import React from 'react'
import TestRenderer from 'react-test-renderer';
import CountryList from '../CountryList';

jest.useFakeTimers()

describe('src/components/CountryList', () => {
    it('renders correctly', () => {
        const instance = TestRenderer.create(<CountryList />).toJSON();
        expect(instance).toMatchSnapshot();
    })

    it('renders sections list', () => {
        const instance = TestRenderer.create(<CountryList />).toJSON();
        expect(instance.children.length).toBe(3);
    })

    it('renders title', async () => {
        const instance = TestRenderer.create(<CountryList />).toJSON();
        const text = instance.children[0];
        expect(text.children[0]).toBe('CHOOSE COUNTRIES');
    })

    it('renders flatlist', async () => {
        const instance = TestRenderer.create(<CountryList />).toJSON();
        const flat = instance.children[1].children[0];
        expect(flat.props.data.length).toBe(0);
    })

    it('renders button', async () => {
        const navigate = jest.fn();
        const instance = TestRenderer.create(<CountryList navigation={{ navigate }} />).toJSON();
        const btn = instance.children[2].children[0].children[0].children[0];
        btn.props.onClick();
        expect(btn.children.length).toBe(1);
    })
})