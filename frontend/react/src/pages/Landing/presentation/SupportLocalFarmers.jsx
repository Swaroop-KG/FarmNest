import { motion } from 'framer-motion';
import farmerImg from '/public/farmer.jpg'; // replace with your actual image path
import NavigationButton from '../../../components/Button';

function SupportLocalFarmers() {
  return (
    <div className="mt-[8vh] px-4 md:px-10 py-10">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-green-700 mb-6">Support Local Farmers</h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          By supporting local farmers, you're helping sustain local communities, preserve traditional agricultural practices, and get the freshest, healthiest produce possible. It's more than just food—it's a movement!
        </p>
      </motion.section>

      <motion.div
        className="my-10 flex flex-col-reverse md:flex-row items-center gap-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        <div className="md:w-1/2">
          <img
            src={farmerImg}
            alt="Support Local Farmers"
            className="rounded-lg shadow-md w-full h-auto object-cover"
          />
        </div>
        <div className="md:w-1/2 text-lg text-gray-700">
          <ul className="list-disc pl-5 space-y-3">
            <li><strong>Economic Empowerment:</strong> Your purchase helps small-scale farmers earn a fair income.</li>
            <li><strong>Sustainable Practices:</strong> Many local farms use eco-friendly and organic methods.</li>
            <li><strong>Community Growth:</strong> A thriving local farming community leads to stronger local economies.</li>
            <li><strong>Freshness Guaranteed:</strong> Food doesn’t travel far—so it’s fresher, tastier, and more nutritious.</li>
          </ul>
        </div>
      </motion.div>

      <div className="text-center mt-10">
        <NavigationButton text="Explore Local Products" path="/shop" />
      </div>
    </div>
  );
}

export default SupportLocalFarmers;
