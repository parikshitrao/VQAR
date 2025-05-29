import React from 'react';
import Stats from '../components/Stats/Index';
import { useTitle } from '../hooks/useTitle';
    
const title = 'Frequently Asked Questions';

export default function StatsPage() {
	useTitle(title);
	return <Stats />;
}
 