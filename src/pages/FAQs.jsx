import React from 'react';
import FAQs from '../components/FAQs/Index';
import { useTitle } from '../hooks/useTitle';
    
const title = 'Frequently Asked Questions';

export default function FAQsPage() {
	useTitle(title);
	return <FAQs />;
}
 